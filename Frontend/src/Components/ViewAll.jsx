import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard'
import './Something.css'
import Navbar from './navbar'

const ViewAll = (props) => {
  const navigateTo = useNavigate();
    const [array,setArray] = useState([]);
    const [search,setSearch] = useState('');
    const [main,setMain] = useState('');
    let x = async() => {
      props.setLoader(true);
        const response = await fetch('http://localhost:4500/api/posts/get-recipes',{
            method: 'GET'
        })
        const data = await response.json();
        setArray(data);
        props.setLoader(false);
    }
    useEffect(() => {
      if(props.login === null)  
      {
        navigateTo('/');
      }
      x();
    },[])
    let searchRecipe = async() => {
      console.log(search);
      props.setLoader(true);
      const response = await fetch('http://localhost:4500/api/posts/getRecipeByCategory',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({category: search})
      })
      let data = await response.json();
      console.log(data);
      if(response.ok && data.length > 0) {
        setArray(data);
        props.setLoader(false);
      }
      props.setLoader(false);
    }

  return (
    <>
    <Navbar />
      <div class="input-group ml-12">
        <input type="text" class="input" id="Email" name="Email" placeholder="Search by category..." autocomplete="off" value={search} onChange={async(e) => {
          setSearch(e.target.value);
          await searchRecipe();
        }} />
        <input class="button--submit" value="Search" onClick={searchRecipe}  />
      </div>
      <div className='recipeCardOuter -900 px-10 py-20 flex gap-5 flex-wrap items-center'>
        {array.map(RecipeCard)}
      </div>
      <Link className='addRecipeBtn' to='/addrecipe'>Create</Link>
    </>
  )
}

export default ViewAll
