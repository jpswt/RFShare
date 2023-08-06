import { useQuery } from '@apollo/client';
import MediaList from '../components/MediaList';
import { GET_MEDIA } from '../queries/query';

const MediaSubs = () => {
	const { data, error, loading } = useQuery(GET_MEDIA, {
		fetchPolicy: 'cache-first',
		pollInterval: 500,
	});

	if (error) return <div>Error Page</div>;
	if (loading) return <div>Loading...</div>;
	const { media } = data;

	return (
		<div className=" flex h-screen flex-col items-center ">
			<MediaList media={media} />
		</div>
	);
};
export default MediaSubs;
