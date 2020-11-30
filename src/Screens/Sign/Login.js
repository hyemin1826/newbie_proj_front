import React, { Component } from 'react';


class Login extends Component{
    constructor(props){
        super(props);
        this.submitHandler=this.submitHandler.bind(this);
    }
  
    submitHandler=(event)=>{
        event.preventDefault();
        console.log("hello~~")
        //console.log(event.target.username.value, event.target.password.value)
        
        this.props.login_process({
            username:event.target.username.value,
            password:event.target.password.value
        })
    }

    render () {
        return(
            <div className="loginWrap"> 
                <h1>LOGIN</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="username" placeholder="USERNAME"></input><br></br>
                    <input type="password" name="password" placeholder="PASSWORD"></input><br></br>
                    <input type="submit" value="LOGIN"/>
                </form>
                
            </div>
        );
    }

}

export default Login;