import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default ({userId}) => {
	const [images, setImages] = useState([])

	useEffect(() => {
		axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
		.then((response) => {
			setImages(response.data)
		})
	}, [])

	return (
		<div style={{padding: "5%", display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap"}}>
			{
				images.map((image) => {
					return <img height={200} src={image.url}/>
				})
			}
		</div>
	)
}