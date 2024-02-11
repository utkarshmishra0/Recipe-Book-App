// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const MyRecipeCard = (recipe) => {
  // const naviagteTo = useNavigate();
  // const redirectToEdit = () => {
  //   naviagteTo(`/editRecipe/${recipe.title}`);
  // }
  console.log(recipe);
  const maxLength = 100;
  return (
    <div className="recipeCard mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg" >
      <img class="mt-4 relative border-red-400 w-84 mx-4 h-28 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border shadow-lg  bg-white" src={recipe.imageUrl}></img>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-primary">{recipe.title}</div>
        <p className="recipeDescription text-secondary text-base py-5">
          {recipe.description.length > maxLength
            ? `${recipe.description.substring(0, maxLength)}...`
            : recipe.description}
        </p>
      </div>
      <div className="px-6 py-4">
      <Link to={`/showRecipe/title=${encodeURIComponent(recipe.title)}`}>
      <button
            data-ripple-light="true"
            type="button"
            onClick={()=>{

            }}
            class="select-none rounded-lg bg-gray-900 py-3 px-6 mr-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-gray-900/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Show more
          </button>
          </Link>
      <Link to={`/editRecipe/title=${encodeURIComponent(recipe.title)}`}>
      <button
            data-ripple-light="true"
            type="button"
            onClick={()=>{

            }}
            class="select-none rounded-lg bg-gray-900 py-3 px-6 ml-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-gray-900/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Edit
          </button>
          </Link>
      </div>
    </div>
  );
};

export default MyRecipeCard;