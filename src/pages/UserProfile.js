import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom"
import UserImages from "../containers/UserImages"
import axios from "axios"

export default () => {
  const {id} = useParams() // This will be "me" or any id
  const [user, setUser] = useState({})

  useEffect(() => {
    if (id == "me" && !localStorage.getItem("token")) {
      return <Redirect to="/" />
    } else if (id == "me") {
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
  }, [id])

  const handleFileChange = (e) => {
    const fileInput = e.target
    const formData = new FormData()
    formData.append("image", e.target.files[0])
    axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }})
    .then(() => {
      fileInput.value = null
      const userCopy = {...user}
      setUser({})
      setUser(userCopy)
    })
  }

  return (
    <div>
      {
        user.id ? 
        <>
          <div>
            <img src={user.profileImage} width="200"/>
            <p>{user.username}</p>
          </div>
          <div>
            <input type="file" onChange={handleFileChange} />
            <UserImages userId={user.id}/>
          </div> 
        </> : 
        null
      }
    </div>
  )
}