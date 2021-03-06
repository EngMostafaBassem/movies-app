import React, { useEffect } from 'react';
import './App.css';
import MoviesScreen from './Components/pages/movies-list-screen';
import Navbar from './Components/common/Navbar';
import {BrowserRouter,Routes,Route,}from 'react-router-dom'
import MoviesView from './Components/pages/movies-view-screen/components';
import MoviesAdd from './Components/pages/movies-add-screen/components';
import LoginScreen from './Components/pages/login-screen/components'
import RegisterScreen from './Components/pages/register-screen/components'
import UserContextProvider, { UserContext } from './Components/contexts/user-context';
import PrivateRoute from './Components/common/PrivateRoute';
function App() {
  
  return (
    <BrowserRouter>
     <UserContextProvider>
     <Navbar/>
       <div className="App">    
        <Routes>
         <Route path='movies' >
           <Route  index={true}   element={<PrivateRoute><MoviesScreen/></PrivateRoute>}/>
           <Route  path=':id'     element={<PrivateRoute><MoviesView/></PrivateRoute>}/>
           <Route  path='add'     element={<PrivateRoute><MoviesAdd/></PrivateRoute>}/>
        </Route>

        <Route path='/' >
           <Route  index={true}   element={<PrivateRoute><MoviesScreen/></PrivateRoute>}/>
           <Route  path=':id'     element={<PrivateRoute><MoviesView/></PrivateRoute>}/>
           <Route  path='add'     element={<PrivateRoute><MoviesAdd/></PrivateRoute>}/>
        </Route>

         <Route path='login'    element={<LoginScreen/>} />
         <Route path='register' element={<RegisterScreen/>}/>
         <Route path='*'         element={<div>404</div>} />
         </Routes>
      
      </div>
    </UserContextProvider>    
    </BrowserRouter>
  );
}

export default App;
