import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default ({imageId}) => {
	const [likes, setLikes] = useState([])
	const [liked, setLiked] = useState(false)
	const [likesNum, setLikesNum] = useState(0)

	useEffect(() => {
		axios.get(`https://insta.nextacademy.com/api/v2/images/${imageId}`,
		{
			headers: {
	          Authorization: "Bearer " + localStorage.getItem("token")
	        }
		})
		.then((response) => {
			// console.log(response.data)
			setLikes(response.data.likes)
			setLiked(response.data.liked)
			setLikesNum(response.data.likes.length)
		})
	}, [imageId])

	const handleLike = () =>{
		axios.post(`https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`,{},
		{
			headers: {
	          Authorization: "Bearer " + localStorage.getItem("token")
	        }
		})
		.then((response) => {
			console.log(response.data)
			// setLikes(response.data.likes)
			setLiked(response.data.liked)
			setLikesNum(liked ? likesNum-1 : likesNum+1)
		})
	}
	return (
		<div style={{padding: "5%", display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap"}}>
			<h6>Likes : {likesNum}</h6>
			{
				liked ? <button onClick={()=>handleLike()}>Unlike</button> : <button onClick={()=>handleLike()}>Like</button>
			}
		</div>
	)
}