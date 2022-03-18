import React from 'react';
import './App.css';
import MoviesScreen from './Components/pages/movies-list-screen';
import CustomersScreen from './Components/pages/customers-list-screen';
import RentalScreen from './Components/pages/rentals-list-screen'
import Navbar from './Components/common/Navbar';
import {BrowserRouter,Routes,Route,}from 'react-router-dom'
import MoviesView from './Components/pages/movies-view-screen/components';
import MoviesAdd from './Components/pages/movies-add-screen/components';
function App() {
 
  return (
    <BrowserRouter>
     <Navbar/>
     <div className="App">
       <Routes>
         <Route path='movies' >
           <Route  index={true} element={<MoviesScreen/>}/>
           <Route  path=':id' element={<MoviesView/>}/>
           <Route  path='add' element={<MoviesAdd/>}/>
        </Route>
        <Route path='/' >
           <Route  index={true} element={<MoviesScreen/>}/>
           <Route  path=':id'   element={<MoviesView/>}/>
           <Route  path='add'   element={<MoviesAdd/>}/>
         </Route>
         <Route path='customers' element={<CustomersScreen/>} />
         <Route path='rentals' element={<RentalScreen/>} />
      
         <Route path='*'  element={<div>404</div>} />
         
       </Routes>
       
    </div>
    </BrowserRouter>
  );
}

export default App;
