import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'


const Edit = (props) => {

  let navigateTo = useNavigate();

  let [mainTitle,setMainTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState('');


  let { title } = useParams();

  let xyz = async() => {
    if(mainTitle) {
      props.setLoader(true);
    let response = await fetch('http://localhost:4500/api/posts/getRecipeByTitle',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: mainTitle})
    });
    let data = await response.json();
    console.log(data.description);
    setDescription(data.description);
    setImage(data.imageUrl);
    setCategories(data.categories);
    props.setLoader(false);
  }
  }
  useEffect(() =>{
    console.log("title " + mainTitle);
    if(props.login === null)  
      {
        navigateTo('/login');
      }
  xyz();
  },[mainTitle])
  useEffect(() => {
    setMainTitle(title.slice(6));
  },[])
    const handleSubmit = async (e) => {
      event.preventDefault();
      props.setLoader(true);
      const formData = new FormData();
      formData.append('title', mainTitle);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('categories', categories);

        const response = await fetch('http://localhost:4500/api/posts/update-recipe', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          navigateTo('/viewall')
          props.setLoader(false);
        } else {
          console.error('Failed to create post');
          props.setLoader(false);
        }
    };
    
  return (
    <div>
      <div className="form-container">
    <form onSubmit={handleSubmit} id="postForm">
      <label htmlFor="title">Recipe Title:</label>
      <input type="text" id="title" contentEditable={false} value={mainTitle} />
      <label htmlFor="description">Edit Description:</label>
    <textarea id="description" name="description" value={description} rows="4" required onChange={(e) => setDescription(e.target.value)}></textarea>
      <label>Upload New Image:</label>
      <input id="image" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <label>Categories (separated by commas):</label>
      <input type="text" id="categoriesInput" placeholder="Enter categories" value={categories.toString()} onChange={(e) => setCategories(e.target.value)} />
      <button type="submit">Update Recipe</button>
    </form>
    </div>
    </div>
  )
}

export default Edit
