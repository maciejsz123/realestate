import React from 'react';

window.onresize = function() {
  if(document.querySelector('.hamburger').classList.contains('clickedHamburger')) {
    document.querySelector('.hamburger').classList.remove('clickedHamburger');
    document.querySelector('.headerul').classList.remove('hamburgerActiveDisplay');
  }
}

function onClick() {
  document.querySelector('.hamburger').classList.toggle('clickedHamburger');
  document.querySelector('.headerul').classList.toggle('hamburgerActiveDisplay');
}

function closeMenu(e) {
  if(document.querySelector('.headerul').classList.contains('hamburgerActiveDisplay')) {
    document.querySelector('.hamburger').classList.remove('clickedHamburger');
    document.querySelector('.headerul').classList.remove('hamburgerActiveDisplay');
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
      <div className='navbar navbar-expand-md bg-light justify-content-center row headerul hideOnSmall'>
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
