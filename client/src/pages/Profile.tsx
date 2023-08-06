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

	return (
		<div className=" flex h-screen flex-col items-center">
			<div className="flex">
				<div>
					<h1>{profile.user.name}</h1>
					<p>{profile.bio}</p>
				</div>
				<div>
					{profile.currentProfile ? (
						<div>
							<button className="btn btn-primary">Primary</button>
							<AddMedia
								openModal={openAddMediaModal}
								setOpenModal={setOpenAddMediaModal}
							>
								<form method="dialog">
									<h3 className="text-lg font-bold">Edit Task</h3>
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
							</AddMedia>
						</div>
					) : null}
				</div>
			</div>

			<ProfileList media={profile.user.media} />
		</div>
	);
};
export default Profile;
