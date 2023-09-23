import React, {  useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const auth=localStorage.getItem('user')
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/home'); // Navigate to the logout page or any other appropriate route
    window.location.reload(); // Refresh the page to apply changes
  };
  return (
    <div className='cssproperty'>
      <button className={`hamburger ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
     
          {
            auth? <ul className={`cssflex ${showMenu ? 'show' : ''}`}>
        <li><Link to='/' onClick={closeMenu}>Products</Link></li>
        <li><Link to='/add' onClick={closeMenu}>Add Products</Link></li>
        <li><Link to='/update' onClick={closeMenu}>Update Products</Link></li>
         <li> <Link to='/log' onClick={handleLogout}>Log out ({JSON.parse(auth).name})</Link></li> 
         </ul>
            :<ul className={`cccc cssflex ${showMenu ? 'show' : ''}`}>
                 
                 <li className=''><Link to='/home'  onClick={closeMenu}>Store</Link></li>
                 <li className=''><Link to='/sign' onClick={closeMenu}>Sign Up</Link></li>
                 <li className=''> <Link to='/login' onClick={closeMenu}>Login</Link></li>
                 </ul>
                 
            
          }
        
      
    </div>
  );
}
