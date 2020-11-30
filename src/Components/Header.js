import React from 'react';
import {Link} from "react-router-dom";
import icon from '../habit_icon.jpg';
import "../style.css";
import styled, {css} from 'styled-components';

const style={
    color:"#40977E",
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
}

function Header() {
    return(
	<div>
        <img src={icon} className="Main"/>
    	<div>
            <Link to="/login">
                <button id='login'>LOGIN</button>
            </Link>
            <Link to="/register">
                <button id='register'>REGISTER</button>
            </Link>
            <Link to="/board">
                <button id='board'>BOARD</button>
            </Link>
        </div>
	</div>
    )
}

export default Header;