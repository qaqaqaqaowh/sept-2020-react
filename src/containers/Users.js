import React, {useState, useEffect} from 'react';
import axios from 'axios'
import UserImages from './UserImages.js'

export default () => {
	const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users")
    .then((response) => {
      setUsers(response.data)
    })
  }, [])

  return (
    users.map((user) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: 'auto'
        }}
      >
        <div style={{display: "flex", alignItems: "center", padding: "5% 5% 5%", border: "2px solid black"}}>
          <img style={{borderRadius: "50%", marginRight: "5%"}} width={100} src={user.profileImage}/>
          <h1>{user.username}</h1>
        </div>
        <UserImages userId={user.id}/>
      </div>
    ))
  )
}