import { CREATE_MEDIA, GET_PROFILE } from '../queries/query';
import { useMutation } from '@apollo/client';
import { v4 } from 'uuid';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useState, FormEvent } from 'react';

const AddMedia = () => {
	const [media, setMedia] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const ext = media?.type.split('/')[1];
	const Key = `${v4()}.${ext}`;
	console.log(ext);
	console.log(media);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState({});
	const [thumbnail, setThumbnail] = useState('Testing');

	console.log(title, description, url);

	const handleFileSelect = (files: any) => {
		if (files) {
			setMedia(files[0]);
		}
		setUrl(files[0].name);
	};

	const uploadMedia = () => {
		setIsLoading(true);
		if (media === null) return;
		if (media === undefined) {
			return alert('Must have file to upload');
		}
		if (media) {
			const mediaRef = ref(storage, `media/${Key}`);
			uploadBytes(mediaRef, media).then(() => {
				setIsLoading(false);
				alert('Media Uploaded');
			});
		}
	};

	const [createMedia, { data }] = useMutation(CREATE_MEDIA, {
		refetchQueries: [GET_PROFILE, 'GetProfile'],
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		uploadMedia();
		if (!title || !description || !url) return;
		else
			createMedia({
				variables: {
					title: title,
					description: description,
					url: url,
					thumbnail: thumbnail,
				},
			});
	};

	return (
		<div>
			{/* Open the modal using ID.showModal() method */}
			<button
				className="btn"
				onClick={() => {
					if (document) {
						(
							document.getElementById('my_modal_1') as HTMLFormElement
						).showModal();
					}
				}}
			>
				open modal
			</button>
			<dialog id="my_modal_1" className="modal">
				<form method="dialog" className="modal-box" onSubmit={handleSubmit}>
					<h3 className="text-lg font-bold">Add A New Track</h3>
					<label className="label">
						<span className="label-text">Track Title</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label className="label">
						<span className="label-text">Track Description</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label className="label">
						<span className="label-text">Media File</span>
					</label>
					<input
						type="file"
						id="fileinput"
						accept="audio/mpeg"
						onChange={(files) => handleFileSelect(files.target.files)}
						className="file-input file-input-bordered file-input-primary w-full max-w-xs"
					/>
					<label className="label">
						<span className="label-text">Cover Art</span>
					</label>
					<input
						type="file"
						className="file-input file-input-bordered file-input-primary w-full max-w-xs"
					/>
					<div className="modal-action">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn" type="submit">
							Close
						</button>
					</div>
					{/* <button className="btn" type="submit">
				Submit
			</button> */}
				</form>
			</dialog>
		</div>
	);
};

export default AddMedia;
