// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return(
            // <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="row">
            <div className="col m10 offset-m1">
            <nav className="green">
                <div className="nav-wrapper">
                <a href="#" className="brand-logo black-text" className="tab">Authors Haven</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        
                        <li className="">
                            <Link className="nav-link" to="/register">Sign Up</Link>
                        </li>
                        <li className="">
                            <Link className="nav-link" to="/login">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
            </div>
        )
    }
}
export default Navbar;

// <nav>
// <div class="nav-wrapper">
//   <a href="#" class="brand-logo">Logo</a>
//   <ul id="nav-mobile" class="right hide-on-med-and-down">
//     <li><a href="sass.html">Sass</a></li>
//     <li><a href="badges.html">Components</a></li>
//     <li><a href="collapsible.html">JavaScript</a></li>
//   </ul>
// </div>
// </nav>