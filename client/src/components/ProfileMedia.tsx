import { AiFillDislike, AiFillLike } from 'react-icons/ai';

type trackProps = {
	track: Media;
};

const ProfileMedia = ({ track }: trackProps) => {
	console.log(track);

	return (
		<tr>
			<td>
				<div className="avatar">
					<div className="mask mask-squircle h-12 w-12">
						<img src={track.thumbnail} alt="Avatar Tailwind CSS Component" />
					</div>
				</div>
			</td>
			<td>{track.title}</td>
			<td>{track.url}</td>
			<td>
				<div className="flex gap-4">
					{track.likesCount > 0 ? track.likesCount : 0}{' '}
					{track.likesCount === 1 ? 'Like' : 'Likes'}
				</div>
			</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
};
export default ProfileMedia;
