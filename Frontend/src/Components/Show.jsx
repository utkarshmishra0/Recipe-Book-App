import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'


const Show = (props) => {

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
  xyz();
  },[mainTitle])

  useEffect(() => {
    setMainTitle(title.slice(6));
  },[])
    const handleSubmit = async (e) => {
      navigateTo('/viewAll');
    };
    
  return (
    <div>
      <div className="form-container">
    <form onSubmit={handleSubmit} id="postForm">
      <label htmlFor="title">Recipe Title:</label>
      <input type="text" id="title" contentEditable={false} value={mainTitle} />
      <label htmlFor="description">Description:</label>
    <textarea id="description" name="description" contentEditable={false} value={description} rows={9} required ></textarea>
      <button type="submit">View More</button>
    </form>
    </div>
    </div>
  )
}

export default Show
