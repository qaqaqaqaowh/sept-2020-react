import React, {useState} from 'react'
import {Link} from "react-router-dom"
import Modal from '../containers/Modal'


export default () => {
	const [loggedIn, setLogin] = useState(localStorage.getItem("token"))
	
	const handleLogout = () => {
		localStorage.removeItem("token")
		setLogin(false)
	}

	return (
		<div>
		  <h2>Navbar</h2>
		  <Link to="/" >Home</Link>
		  {
		  	localStorage.getItem("token") ?
		  	<Link to="/users/me" >Profile</Link>
		  	: null
		  }
		  {
		  	loggedIn ? <button onClick={handleLogout}>Logout</button> : <Modal setLogin={setLogin}/>
		  }
		</div>
	)
}