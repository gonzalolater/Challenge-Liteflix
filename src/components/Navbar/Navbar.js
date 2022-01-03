import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { MenuItems } from '../Navbar/MenuItem';
import '../Navbar/styles/Navbar.css'
import {Button} from '../Navbar/Button'
class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Liteflix<i className="fas fa-cat"></i></h1>
                
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                 {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul> 
                <Button>Login</Button>
            </nav>
        )
    }

}

export default Navbar