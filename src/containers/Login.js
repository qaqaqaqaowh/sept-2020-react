import React, {useState} from 'react'
import axios from 'axios'

export default ({setOpen, setLogin}) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = () => {
		axios.post("https://insta.nextacademy.com/api/v1/login", {
			username,
			password
		})
		.then(resp => {
			localStorage.setItem("token", resp.data.auth_token)
			setOpen(false)
			setLogin(resp.data.auth_token)
		})
	}

	return (
		<>
			<input value={username} placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} />
			<input value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
			<button onClick={handleLogin}>Login</button>
		</>
	)
}