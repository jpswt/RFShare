import { useQuery } from '@apollo/client';
import MediaList from '../components/MediaList';
import { GET_MEDIA2 } from '../queries/query';

const MediaSubs = () => {
	const { data, error, loading } = useQuery(GET_MEDIA2);

	if (error) return <div>Error Page</div>;
	if (loading) return <div>Loading...</div>;
	const { media } = data;
	console.log(media);

	return (
		<div className=" flex h-screen flex-col items-center ">
			<MediaList media={media} />
		</div>
	);
};
export default MediaSubs;
