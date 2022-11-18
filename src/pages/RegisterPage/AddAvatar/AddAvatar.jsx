import { 
	Button,
	Modal
 } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react';

import './AddAvatar.css'

function AddAvatar({onChange}){

	const [modalOpened,setModalOpened] = useState(false);

	const [avatar,setAvatar] = useState(null);
	const [preview,setPreview] = useState(null);

	const [capturing,setCapturing] = useState(false);

	const inputRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	const avatarChangeHandler = (e) => {
		console.log(e.target.files[0]);
		let file = e.target.files[0];
		setAvatar(file)
		onChange({
			name : "avatar",
			value : file
		})

		let reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		}
		reader.readAsDataURL(file);
	}

	const captureAvatar = () => {
		setModalOpened(true);
		navigator.mediaDevices.getUserMedia({video : true})
			.then(stream => {
				videoRef.current.srcObject = stream;
			})
	}
	
	// let captureAvatarImage;
	
	// useEffect(() => {
	// 	console.log('canvas = ',canvasRef.current)
	// 	const context = canvasRef.current.getContext('2d');
	// 	captureAvatarImage = () => {
	// 		console.log('capturing',context)
	// 	}
	
	// },[])

	useEffect(() => {
		if(canvasRef && capturing){
			const context = canvasRef.current.getContext('2d');
			console.log('context = ',context)
			context.drawImage(videoRef.current,0,0,canvasRef.current.width,canvasRef.current.height);
			let data = canvasRef.current.toDataURL('image/png');
			setPreview(data);
		}
	},[capturing])

	return(
		<div className='avatar-upload-container'>
			{
				preview ?
					<img className = "img-area" src={preview} alt="" />:
					<div className="img-area">
						<Icon icon = "material-symbols:add-circle-outline" />
					</div>
			}
			<Button
				variant = "outline"
				// onClick = {() => inputRef.current.click()}
				onClick = {captureAvatar}
			>
				{/* <input 
					ref = {inputRef} 
					type="file" 
					hidden
					onChange = {avatarChangeHandler}
					accept="image/jpeg,image/png,image/jpg"
				/> */}
				{
					preview ?
						"capture avatar":
						"capture avatar"
				}
			</Button>
			<Modal
				opened = {modalOpened}
				onClose = {() => {
					setModalOpened(false);
				}}
				title = "capture avatar"
			>
				<video 
					ref = {videoRef}
					autoPlay
				/>
				<Button
					fullWidth
					mt = "2em"
					onClick = {() => setCapturing(true)}
				>
					Capture
				</Button>
			</Modal>
			<canvas 
				style = {{
					border: "1px solid red",
					height : "150px",
					width : "150px",
					marginInline : "auto",
					display : "none",
				}}
				ref = {canvasRef}
			/>
		</div>
	)

}

export default AddAvatar;