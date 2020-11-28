import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import Login from "../Screens/Sign/Login";
import Register from "../Screens/Sign/Register";
import Board from "../Screens/Board";


function Routes () {
    console.log(this.props);
    return(
        <Router>
            <Header />
            <Route path="/login" render={()=>< Login login_process={(login_info)=>{        
                //console.log("start to fetch!");
                    console.log(JSON.stringify(login_info));
                    fetch('http://localhost:8000/login',{
                    method:"post",
                    headers:{
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    credentials:"same-origin",
                    body:JSON.stringify(login_info)
                    })
                    .then(res=>res.json())
                    .then(user=>{
                        if(user.isValid){//username, isValid, habit 만!!
                            this.setState({users:user.username, isValid:1, habit:user.habit});
                            return (<Redirect to={{pathname:'/', state:this.state}}/>);
                        }
                        else{
                            this.setState({isValid:0});
                            alert('fail to login');
                            return (<Redirect to={{pathname:'/login', state:this.state}}/>);
                        }
                    })
                }}/>
            }/> 
            <Route path="/register" component={Register} />
            <Route path="/board" render={()=><Board state={this.props.state} />}/>
        </Router>
    )
}

export default Routes;
