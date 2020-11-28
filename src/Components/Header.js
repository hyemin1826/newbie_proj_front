import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return(
	<div>
    	<ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/board">Board</Link>
            </li>
        </ul>
	</div>
    )
}

export default Header;