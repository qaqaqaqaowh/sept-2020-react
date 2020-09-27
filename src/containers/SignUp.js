import React, {useState} from 'react'
import axios from 'axios'

export default ({setOpen, setLogin}) => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConf, setPasswordConf] = useState("")

	const handleSignUp = () => {
		axios.post("https://insta.nextacademy.com/api/v1/users/", {
			username,
			email,
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
			<input value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
			<input value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
			<input value={passwordConf} placeholder="Confirm Password" onChange={(e) => {setPasswordConf(e.target.value)}} />
			<button onClick={handleSignUp} disabled={!email || !username || !password || !passwordConf || (password != passwordConf)}>Sign Up</button>
		</>
	)
}