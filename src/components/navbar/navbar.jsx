import React from 'react';
import './navbar.sass';

window.onresize = function() {
  if(document.querySelector('.hamburger').classList.contains('clicked-hamburger')) {
    document.querySelector('.hamburger').classList.remove('clicked-hamburger');
    document.querySelector('.headerul').classList.remove('hamburger-active-display');
  }
}

function onClick() {
  document.querySelector('.hamburger').classList.toggle('clicked-hamburger');
  document.querySelector('.headerul').classList.toggle('hamburger-active-display');
}

function closeMenu(e) {
  if(document.querySelector('.headerul').classList.contains('hamburger-active-display')) {
    document.querySelector('.hamburger').classList.remove('clicked-hamburger');
    document.querySelector('.headerul').classList.remove('hamburger-active-display');
  }
}

function Navbar() {
  return(
    <div>
      <div className='hamburger' onClick={onClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='navbar navbar-expand-md bg-light justify-content-center row headerul hide-on-small'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='navbar-brand' href='1'>LOGO</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='1'>rent</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='1'>buy</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='1'>home</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
