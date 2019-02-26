import React , { Component } from 'react'
import logo from './img/logo.png'
import { NavLink, Link } from 'react-router-dom';
import { ReactConsumer } from '../../context'
import './css/Navbar.scss'

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggleMenu : false
        }
    }

    ToggleMenu = () => {
        const currentState = this.state.toggleMenu;
        this.setState({ toggleMenu: !currentState });
    }

    closeToogleMenu = () => {
        if(document.getElementById('chk').checked)
        {
            document.getElementById('chk').checked = false
            this.ToggleMenu()
        }
    }
    

    render (){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                { <Logo /> }
                <input id="chk" type="checkbox" />
                <label htmlFor="chk" className={`btn-nav ${this.state.toggleMenu ? "toggle-button-on" : "toggle-button-off"}`} onClick={this.ToggleMenu} >
                    {/* <i className="fas fa-times"></i> */}
                </label>
                <div className="toogle-show">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" exact to="/" onClick={() => this.closeToogleMenu()}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/products" onClick={() => this.closeToogleMenu()}>Products</NavLink>
                    </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" id="cart">
                            <Link className="nav-link" to='/cart' onClick={() => this.closeToogleMenu()}>
                                <ReactConsumer>
                                {
                                    (value) => {
                                        return(
                                            <i className={`fas fa-shopping-cart cart-class ${value.cart.length > 0 ? "ring" : ""}`}>
                                                <span>{value.cart.length}</span>
                                            </i>
                                        )
                                    }
                                }
                                </ReactConsumer>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const Logo = () => {
    return (
        <NavLink className="navbar-brand logo" to="/"><img alt="logo" src={logo} /></NavLink>
    )
}

export default Navbar