import { useParams } from 'react-router-dom';
import { GET_PROFILE } from '../queries/query';
import { useQuery } from '@apollo/client';
import ProfileList from '../components/ProfileList';
import AddMedia from '../components/AddMedia';
// import { storage } from '../firebase/firebase';
// import { ref, uploadBytes } from 'firebase/storage';
// import { useState, FormEvent } from 'react';
// import { v4 } from 'uuid';

const Profile = () => {
	// const [media, setMedia] = useState<File>();
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	// const ext = media?.type.split('/')[1];
	// const Key = `${v4()}.${ext}`;
	// console.log(ext);
	// console.log(media);

	// const [title, setTitle] = useState('');
	// const [description, setDescription] = useState('');
	// const [url, setUrl] = useState(Key);
	// const [thumbnail, setThumbnail] = useState('Testing');

	const { id } = useParams();
	const { data, error, loading } = useQuery(GET_PROFILE, {
		variables: {
			userId: id,
		},
	});

	// const handleFileSelect = (files: any) => {
	// 	if (files) {
	// 		setMedia(files[0]);
	// 	}
	// };

	// const uploadMedia = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	setIsLoading(true);
	// 	if (media === null) return;
	// 	if (media === undefined) {
	// 		return alert('Must have file to upload');
	// 	}
	// 	if (media) {
	// 		const mediaRef = ref(storage, `media/${Key}`);
	// 		uploadBytes(mediaRef, media).then(() => {
	// 			setIsLoading(false);
	// 			alert('Media Uploaded');
	// 		});
	// 	}
	// };

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
				<div>{profile.currentProfile ? <AddMedia /> : null}</div>
			</div>

			<ProfileList media={profile.user.media} />
		</div>
	);
};
export default Profile;
