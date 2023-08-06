import { useParams } from 'react-router-dom';
import { GET_PROFILE } from '../queries/query';
import { useQuery } from '@apollo/client';
import ProfileList from '../components/ProfileList';

const Profile = () => {
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
			<div>
				<div>
					<h1>{profile.user.name}</h1>
					<p>{profile.bio}</p>
				</div>
			</div>

			<ProfileList media={profile.user.media} />
		</div>
	);
};
export default Profile;
