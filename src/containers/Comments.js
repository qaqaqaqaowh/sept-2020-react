import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default ({imageId}) => {
	const [comments, setComments] = useState([])
	const [text, setText] = useState('')
	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		axios.get(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
		{
			headers: {
	          Authorization: "Bearer " + localStorage.getItem("token")
	        }
		})
		.then((response) => {
			console.log(response.data)
			setComments(response.data)
		})
	}, [imageId,submitted])

	const handleCommentLike = (commentId) => {
		axios.post(`https://insta.nextacademy.com/api/v1/comments/${commentId}/toggle_like`,{},
		{
			headers: {
	          Authorization: "Bearer " + localStorage.getItem("token")
	        }
		})
		.then((response) => {
			// console.log(response.data.liked)
			setComments(comments.map(com=>{
				if(com.id===commentId){
					return {
						...com,
						liked: response.data.liked
					}
				}
				return com
			}))
		})
	}
	const handleInput = (e) => {
		setText(e.target.value)
	}
	const handleComment = (e) => {
		e.preventDefault()
		axios.post(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
			{
				content: text
			},
		{
			headers: {
	          Authorization: "Bearer " + localStorage.getItem("token")
	        }
		})
		.then((response) => {
			console.log(response.data)
			setText('')
			setSubmitted(true)
		})
		setSubmitted(false)
	}
	return (
		<div>
			{
				comments.map(com=>(
					<div style={{padding:5,border:'1px solid black'}} key={com.id}>
						{com.content}
						{
							com.liked ?
							<button onClick={()=>handleCommentLike(com.id)}>Unlike</button>
							: <button onClick={()=>handleCommentLike(com.id)}>Like</button>
						}
					</div>
					))
			}
			<form onSubmit={handleComment}>
				<input type="text" value={text} onChange={handleInput} placeholder="Comment here..." />
			</form>
		</div>
	)
}





