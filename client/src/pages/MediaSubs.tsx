import { useQuery } from '@apollo/client';
import MediaList from '../components/MediaList';
import { GET_MEDIA } from '../queries/query';
import { MEDIA_LIKES } from '../queries/query';

const MediaSubs = () => {
	const { data, error, loading } = useQuery(GET_MEDIA, {
		fetchPolicy: 'network-only',
		pollInterval: 500,
	});

	const {
		data: mediaData,
		error: mediaError,
		loading: mediaLoading,
	} = useQuery(MEDIA_LIKES, {
		fetchPolicy: 'network-only',
		pollInterval: 500,
	});

	if (error || mediaError) return <div>Error Page</div>;
	if (loading || mediaLoading) return <div>Loading...</div>;
	const { media } = data;
	const { mediaLikes } = mediaData;
	const { likesCount } = mediaLikes;

	return (
		<div className=" flex h-screen flex-col items-center ">
			<MediaList media={media} />
		</div>
	);
};
export default MediaSubs;
