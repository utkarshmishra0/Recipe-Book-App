import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Add from './Components/Add'
import ViewAll from './Components/ViewAll'
import MyRecipe from './Components/MyRecipe'
import Edit from './Components/Edit'
import Login from './Components/Login'
import Register from './Components/Register'
import Show from './Components/Show'
import Loader from './Components/Loader'

const App = () => {
  const [login,setLogin] = useState(null);
  const [loader,setLoader] = useState(false);
  return (
    <div>
      <BrowserRouter>
      {loader ? <Loader/> : <></>}
        <Routes>
          <Route index element={<Login login={login} setLogin={setLogin} setLoader={setLoader} />} />
          <Route path='/viewall' element={<ViewAll login={login} setLogin={setLogin} setLoader={setLoader} />} />
          <Route path='/addRecipe' element={<Add login={login} setLogin={setLogin} setLoader={setLoader}/>} />
          <Route path='/editRecipe/:title' element={<Edit login={login} setLogin={setLogin} setLoader={setLoader}/>} />
          <Route path='/showRecipe/:title' element={<Show login={login} setLogin={setLogin} setLoader={setLoader}/>} />
          <Route path='/login' element={<Login login={login} setLogin={setLogin} setLoader={setLoader}/>} />
          <Route path='/register' element={<Register login={login} setLogin={setLogin} setLoader={setLoader}/>} />
          <Route path='/myRecipe' element={<MyRecipe login={login} setLogin={setLogin} setLoader={setLoader}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
