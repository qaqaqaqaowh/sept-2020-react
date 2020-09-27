import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import UserImages from "../containers/UserImages"
import axios from "axios"

export default () => {
  const {id} = useParams() // This will be "me" or any id
  if (id == "me" && !localStorage.getItem("token")) {
    return <Redirect to="/" />
  }
  const [user, setUser] = useState({})

  useEffect(() => {
    if (id == "me") {
      axios.get("https://insta.nextacademy.com/api/v1/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((response)=>{
        setUser({...response.data, profileImage: response.data.profile_picture})
      })
    } else {
      axios.get("https://insta.nextacademy.com/api/v1/users/" + id)
      .then((response)=>{
        setUser(response.data)
      })
    }
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