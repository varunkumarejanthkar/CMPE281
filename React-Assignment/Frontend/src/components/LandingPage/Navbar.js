import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.changeActiveClass = this.changeActiveClass.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        // console.log("Cookie : " + cookie.load('cookie'));
        // this.props.history.push("/home");
    }
    changeActiveClass = (className) => {
        console.log("Inside changeActiveClass : " + className);
        const currentElement = document.getElementsByClassName(className)[0];
        console.log("currentElement : " + currentElement.className);
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        currentElement.className += " active";
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Book Store App</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class = "home active" onClick = {() => this.changeActiveClass('home')}><Link to="/home">Home</Link></li>
                        <li class = "create" onClick = {() => this.changeActiveClass('create')}><Link to="/create">Add a Book</Link></li>
                        <li class = "delete" onClick = {() => this.changeActiveClass('delete')}><Link to="/delete">Delete a Book</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;