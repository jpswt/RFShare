import { PiHeartDuotone, PiHeartLight } from 'react-icons/pi';
import { DISLIKE_MEDIA, GET_MEDIA, LIKE_MEDIA } from '../queries/query';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

type trackProps = {
	track: Media;
};

const Media = ({ track }: trackProps) => {
	const [likeMedia] = useMutation(LIKE_MEDIA, {
		refetchQueries: [GET_MEDIA, 'GetMedia'],
	});

	const [unLikeMedia] = useMutation(DISLIKE_MEDIA, {
		refetchQueries: [GET_MEDIA, 'GetMedia'],
	});
	console.log(track);
	console.log(track.likes);

	return (
		<tr>
			<td>
				<div className="avatar">
					<div className="mask mask-squircle h-12 w-12">
						<img src={track.thumbnail} alt="Avatar Tailwind CSS Component" />
					</div>
				</div>
			</td>
			<td>
				<div className="flex items-center space-x-3">
					<Link to={`/profile/${track.user.id}`}>
						<div className="font-bold">{track.artist}</div>
					</Link>
				</div>
			</td>
			<td>{track.title}</td>
			<td>{track.url}</td>
			<td>
				<div className="flex gap-4">
					<div className=" flex gap-2 text-xl text-teal-600">
						{track.likedByCurrentUser ? (
							<div
								onClick={() =>
									unLikeMedia({
										variables: {
											mediaId: track.id,
										},
									})
								}
							>
								<PiHeartDuotone />
							</div>
						) : (
							<div
								onClick={() =>
									likeMedia({
										variables: {
											mediaId: track.id,
										},
									})
								}
							>
								<PiHeartLight />
							</div>
						)}
					</div>
					{track.likesCount}{' '}
					{track.likesCount === 0 || track.likesCount > 1 ? 'Likes' : 'Like'}
				</div>
			</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
};
export default Media;
