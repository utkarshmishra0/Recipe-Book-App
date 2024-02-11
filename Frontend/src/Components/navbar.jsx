import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import './navbarStyles.css'

const Navbar = (props)=>{
    const navigateTo = useNavigate();
    return(
       <nav className="navbar">
        <ul>
            <Link to='/addRecipe'><li>Create Recipe</li></Link>
            <Link to='/myRecipe'><li>My Recipes</li></Link>
            <Link to='/viewAll'><li>All Recipes</li></Link>
            <Link to='/login'><li>Log Out</li></Link>
            
        </ul>
       </nav>
    )
}

export default Navbar;