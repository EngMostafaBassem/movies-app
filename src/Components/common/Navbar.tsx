import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../contexts/user-context'
import AuthServices from '../services/auth'
const Navbar=()=>{
  const context=React.useContext(UserContext)
  const navigate=useNavigate()
  const handleLogout=()=>{
       context?.setCurrentUser(null) 
       navigate('/login')
       AuthServices.logout()
  }
    return(
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light ps-4">
         <Link to="/movies" className='navbar-brand'>Vidly</Link>      
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
           {
             context?.currentUser?
              <>
               <li className="nav-item active">
                   <Link to="/movies" className='nav-link'>Movies</Link>    
               </li>
                 <li className="nav-item ">
                    <Link to="/" className='nav-link'>{context?.currentUser?.name}</Link>
                  </li>
                  <li className="nav-item " onClick={handleLogout}>
                    <Link to="/register" className='nav-link' >Log out</Link>
                  </li>
               </>
             :
              <li className="nav-item ">
               <Link to="/register" className='nav-link'>Register</Link>    
              </li>
           }
          </ul>
        </div>
      </nav>
    )

}
export default Navbar