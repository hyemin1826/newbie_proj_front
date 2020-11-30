import React, {Component} from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Header from "./Header";
import Login from "../Screens/Sign/Login";
import Register from "../Screens/Sign/Register";
import Board from "../Screens/Board";

const mainStyle={
    color:"#695956",
    fontWeight:"bold", 
    fontSize:40
}

class App extends Component{
    state={ }
    componentDidMount(){
        fetch('/login')
        .then(res=>res.json)
        .then(users => this.setState({users}));
    }

    Save=(info)=>{
        this.setState({'username':info.username, 'isLogin':info.isLogin, 'habit':info.habit});
    }

    render(){
        //console.log(this.state.habit[0]['record']);
        return (
            <div className="App">
                <div style={mainStyle}>Habit Maker</div>
                <Router>
                    <Header />
                    <Route path="/login" render={()=>< Login  login_process={(login_info)=>{        
                        //console.log("start to fetch!");
                            console.log(JSON.stringify(login_info));
                            fetch('/login',{
                            method:"POST",
                            headers:{
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            credentials:"same-origin",
                            body:JSON.stringify(login_info)
                            })
                            .then(res=>res.json())
                            .then(user=>{
                                console.log(user);
                                /*
                                if(user.isLogin){//username, isValid, habit 만!!
                                    console.log("success to login");
                                    this.setState({users:user.username, isLogin:1, habit:user.habit});
                                    return (<Redirect to={{pathname:'/', state:this.state}}/>);
                                }
                                else{
                                    this.setState({iLogin:0});
                                    alert('fail to login');
                                    return (<Redirect to={{pathname:'/login', state:this.state}}/>);
                                }
                                */
                               this.Save(user);
                               return <Redirect to={Board} />
                            })
                        }}/>}/> 
                    <Route path="/register" render={()=>< Register register_process={(register_info)=>{        
                            console.log("start to fetch!");
                            fetch('/register',{
                            method:"post",
                            headers:{
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            credentials:"same-origin",
                            body:JSON.stringify(register_info)
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                if(data.isValid){//register 성공!
                                    console.log(data);
                                    return (<Redirect path='/login' Component={Login}/>);
                                }
                                else{
                                    alert('fail to login');
                                    //return (<Redirect to={{pathname:'/register', state:this.state}}/>);
                                }
                            })
                        }}/>}/> 
                    <Route path="/board" render={()=><Board state={this.state} />}/>
                </Router>    
            </div>
        );
    }
}

export default App;