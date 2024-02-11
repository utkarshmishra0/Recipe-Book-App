const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = "102938";

const PORT = process.env.PORT || 4500;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());


//Database
mongoose.connect('mongodb+srv://utkarsh:cSTxUu1BXzFu7mvD@cluster0.aury35y.mongodb.net/?retryWrites=true&w=majority')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  gmail: String
})

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true},
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  categories: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const User = mongoose.model('Recipika-Users', userSchema);

//Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });


//API routes

app.post('/api/register',async(req,res)=> {
  const {username,password,gmail} = req.body;
  let existingUser = await User.findOne({username});
  if(existingUser) return res.json({message: "Username already exists"});
  existingUser = await User.findOne({gmail});
  if(existingUser) return res.json({message: "Gmail already exists"});
  let json = {gmail,username,password};
  let newUser = new User(json);
  await newUser.save();
  let token = jwt.sign(json,secret);
  return res.json({token});
})

app.post('/api/login',async(req,res)=> {
  const {username,password} = req.body;
  let existingUser = await User.findOne({username: username});
  if(!existingUser) return res.json({message: "User not found"});
  if(existingUser.password !== password) return res.json({message: "Incorrect password"});
  let json = {username,password,gmail: existingUser.gmail};
  let token = jwt.sign(json,secret);
  return res.json({token});
})

app.post('/api/posts/create-recipe', upload.single('image'), async (req, res) => {
  const { title, description, categories,user } = req.body;
  const token = user;
  const userData = jwt.verify(token,secret);
  username = userData.username;
  const imageUrl = req.file.path;
  const parsedCategories = categories.split(','); // Assuming categories is a string
  console.log(parsedCategories); //for testing purposes
  const newRecipe = new Recipe({ title, description, imageUrl, categories: parsedCategories,username: username });
  await newRecipe.save();
  res.json({ message: 'Recipe created successfully' });
});


app.get('/api/posts/get-recipes', async (req, res) => {
  const recipes = await Recipe.find({},'title description imageUrl');
  const data = recipes.map(recipe => ({
    title: recipe.title,
    description: recipe.description,
    imageUrl: `http://localhost:${PORT}/${recipe.imageUrl}`
  }));
  res.json(data);
});

app.post('/api/posts/update-recipe', upload.single('image'), async (req, res) => {
  const { title, description, categories } = req.body;
  const existingRecipe = await Recipe.findOne({ title: title });
  if (existingRecipe) {
    existingRecipe.description = description;
    existingRecipe.categories = categories.split(','); // Assuming categories is a string
    await existingRecipe.save();
    res.json({ message: 'Recipe Updated successfully' });
  } else {
    res.json({ message: 'Recipe not found' });
  }
});


app.post('/api/posts/getRecipeByTitle',async(req,res)=> {
  let title = req.body.title;
  console.log(title);
  let existingRecipe = await Recipe.findOne({ title: title });
  if(!existingRecipe)
  {
    return res.json({ message: 'Recipe Not Found' });
  }
  else
  {
    return res.json(existingRecipe);
  }
});

app.post('/api/posts/getRecipeByUsername',async(req,res)=> {
  let token = req.body.user;
  if(!token) return res.json({error: "Some error"})
  let userData = jwt.verify(token,secret);
  let username = userData.username;
  console.log(username);
  let existingRecipe = await Recipe.find({ username: username });
  const data = existingRecipe.map(recipe => ({
    title: recipe.title,
    description: recipe.description,
    imageUrl: `http://localhost:${PORT}/${recipe.imageUrl}`
  }));
  if(!existingRecipe)
  {
    return res.json({ message: 'Recipe Not Found' });
  }
  else
  {
    return res.json(data);
  }
});

app.post('/api/posts/getRecipeByCategory',async(req,res)=> {
  let category = req.body.category;
  let recipes = await Recipe.find({});
  let data = [];
  recipes.map(recipe => {
    if(recipe.categories.find((element) => {
      element = element.toLowerCase();
      category = category.toLowerCase();
      return element.startsWith(category);
    })) data.push(recipe);
  });
  let final = data.map(recipe => ({
    title: recipe.title,
    description: recipe.description,
    imageUrl: `http://localhost:${PORT}/${recipe.imageUrl}`
  }));
  return res.json(final);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});