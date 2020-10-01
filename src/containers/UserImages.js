import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import Likes from './Likes'
import Comments from './Comments'
import SessionContext from '../contexts/SessionContext'

export default ({userId}) => {
	const {isLoggedIn} = useContext(SessionContext)
	const [images, setImages] = useState([])

	useEffect(() => {
		axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
		.then((response) => {
			setImages(response.data)
		})
	}, [userId])

	return (
		<div style={{padding: "5%", display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap"}}>
			{
				images.map((image) => {
					return (
						<div>
							<img height={200} src={image.url}/>
							{
								isLoggedIn ?
								<>
									<Likes imageId={image.id} />
									<Comments imageId={image.id} />
								</> :
								null
							}
						</div>
						)
				})
			}
		</div>
	)
}