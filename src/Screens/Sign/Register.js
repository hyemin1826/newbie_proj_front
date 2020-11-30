import React, {Component} from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.submitHandler=this.submitHandler.bind(this);
    }
  
    submitHandler=(event)=>{
        event.preventDefault();
        console.log("hello~~")
        this.props.register_process({
            username:event.target.username.value,
            password:event.target.password.value,
            password2:event.target.password2.value
        })
    }

    render () {
        //console.log(this.props);
        return(
            <div className="RegisterWrap"> 
                <h1>REGISTER</h1>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="username" placeholder="USERNAME"></input><br></br>
                    <input type="password" name="password" placeholder="PASSWORD"></input><br></br>
                    <input type="password" name="password2" placeholder="CONFIRM PASSWORD"></input><br></br>
                    <input type="submit" value="REGISTER"/>
                </form>
            </div>
        );
    }

}

export default Register;