import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Decoded } from '../App'
import logo from '../MOlogo.png'
import logoText from '../MeetOut.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Col, Form, Input, Navbar, NavbarBrand, Nav as Navi, NavLink } from 'reactstrap';

import Login from './Login'

// Props
interface NavProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void
}

const Nav: React.FC<NavProps> = props => {

    // Logout
    const handleLogout = (e: FormEvent) => {
        e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
    }

    // Define links
    let links = (
        <Navi navbar>
            <NavbarBrand className="home-logo" href="/"><img alt="logo-text" id="logo-text" src={logoText} /></NavbarBrand>
            <Login user={props.user} updateUser={props.updateUser} />
        </Navi>
    )

    // Check user exists (select links)
    if (props.user) {
        links = (
        <Navi navbar>
            <NavbarBrand className="logo" href="/"><img alt="logo"src={logo} id="logo-image" /></NavbarBrand>
            <div className="NavItem">
                <NavLink><Link to="/profile">My Profile</Link></NavLink>
            </div>
            <div className="NavItem">
                <NavLink><Link to="/home">Calendar</Link></NavLink>
            </div>
            <div className="NavItem">
                <NavLink><Link to="/create">Create Meet</Link></NavLink>
            </div>
            <div className="NavItem">
                <NavLink><Link to="/" onClick={handleLogout}>Logout</Link></NavLink>
            </div>
        </Navi>
    )}


    return (
        <div>
        <Navbar color="light" light expand="md">
            {links}
        </Navbar>
        </div>
    )
}

export default Nav