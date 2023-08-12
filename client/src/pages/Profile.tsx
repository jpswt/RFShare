import { useParams } from 'react-router-dom';
import { GET_PROFILE } from '../queries/query';
import { useQuery } from '@apollo/client';
import ProfileList from '../components/ProfileList';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useState, FormEvent } from 'react';
import { v4 } from 'uuid';

const Profile = () => {
	const [media, setMedia] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const ext = media?.type.split('/')[1];
	const Key = `${v4()}.${ext}`;
	console.log(ext);
	console.log(media);

	const { id } = useParams();
	const { data, error, loading } = useQuery(GET_PROFILE, {
		variables: {
			userId: id,
		},
	});

	const handleFileSelect = (files: any) => {
		if (files) {
			setMedia(files[0]);
		}
	};

	const uploadMedia = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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

	if (error) return <div>Error Page</div>;

	if (loading) return <div>Loading...</div>;

	const { profile } = data;
	console.log(profile);

	if (profile === null) return <div>Profile does not exist</div>;
	return (
		<div className=" flex h-screen flex-col items-center">
			<div className="flex">
				<div className="flex items-center gap-6  ">
					<img
						src={profile.image}
						className=" h-20 w-20 rounded-[50%] "
						alt=""
					/>
					<div>
						<h1>{profile.user.name}</h1>
						<p>{profile.bio}</p>
					</div>
				</div>
				<div>
					{profile.currentProfile ? (
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
								<form
									method="dialog"
									className="modal-box"
									onSubmit={uploadMedia}
								>
									<h3 className="text-lg font-bold">Add A New Track</h3>
									<label className="label">
										<span className="label-text">Track Title</span>
									</label>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full max-w-xs"
									/>
									<label className="label">
										<span className="label-text">Track Description</span>
									</label>
									<input
										type="text"
										placeholder="Type here"
										className="input input-bordered w-full max-w-xs"
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
										<button className="btn">Close</button>
									</div>
									{/* <button className="btn" type="submit">
										Submit
									</button> */}
								</form>
							</dialog>
						</div>
					) : null}
				</div>
			</div>

			<ProfileList media={profile.user.media} />
		</div>
	);
};
export default Profile;
