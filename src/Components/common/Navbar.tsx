import React from 'react'
import {Link} from 'react-router-dom'
const Navbar=()=>{
    return(
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light ps-4">
         <Link to="/movies" className='navbar-brand'>Vidly</Link>      
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/movies" className='nav-link'>Movies</Link>      
            </li>
          
          </ul>
        </div>
      </nav>
    )

}
export default Navbar