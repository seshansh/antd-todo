import React from 'react';
import './Navbar.css';
import { BiTask } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    return <nav>
        <div className='ham-burger'><GiHamburgerMenu size="2.5rem" color='#060047' /></div>
        <div className="nav__container">
            <h2> <BiTask className='name-icon' size="2rem" color='#393053' />to-DO </h2>

        </div>
    </nav>
};

export default Navbar;