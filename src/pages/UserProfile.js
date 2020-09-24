import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserImages from "../containers/UserImages"
import axios from "axios"

export default () => {
  const {id} = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get("https://insta.nextacademy.com/api/v1/users/" + id)
      .then((response)=>{
        setUser(response.data)
      })
  }, [])
  return (
    <div>
      <div>
        <img src={user.profileImage} width="200"/>
        <p>{user.username}</p>
      </div>
      <div>
        <UserImages userId={id}/>
      </div>
    </div>
  )
}