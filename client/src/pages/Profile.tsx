import { useParams } from 'react-router-dom';
import { GET_PROFILE } from '../queries/query';
import { useQuery } from '@apollo/client';
import ProfileList from '../components/ProfileList';
import AddMedia from '../components/AddMedia';
import { useState } from 'react';

const Profile = () => {
	const [openAddMediaModal, setOpenAddMediaModal] = useState<boolean>(false);
	const [newTrack, setNewTrack] = useState<string>('');

	const { id } = useParams();
	const { data, error, loading } = useQuery(GET_PROFILE, {
		variables: {
			userId: id,
		},
	});

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
								<form method="dialog" className="modal-box">
									<h3 className="text-lg font-bold">Hello!</h3>
									<p className="py-4">
										Press ESC key or click the button below to close
									</p>
									<div className="modal-action">
										{/* if there is a button in form, it will close the modal */}
										<button className="btn">Close</button>
									</div>
								</form>
							</dialog>
							{/* <button className="btn btn-primary">Primary</button>
							<AddMedia
								openModal={openAddMediaModal}
								setOpenModal={setOpenAddMediaModal}
							>
								<form method="dialog">
									<h3 className="text-lg font-bold">Add Media</h3>
									<div className=" mt-4 flex gap-4">
										<input
											onChange={(e) => setNewTrack(e.target.value)}
											value={newTrack}
											type="text"
											placeholder="Type here"
											className="input input-bordered w-full"
										/>
										<button className="btn btn-accent">Update</button>
									</div>
								</form>
							</AddMedia> */}
						</div>
					) : (
						<button>Not Working</button>
					)}
				</div>
			</div>

			<ProfileList media={profile.user.media} />
		</div>
	);
};
export default Profile;
