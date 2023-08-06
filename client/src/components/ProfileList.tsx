import ProfileMedia from './ProfileMedia';

type ProfileProps = {
	media: Media[];
};

const ProfileList = ({ media }: ProfileProps) => {
	return (
		<div className="w-2/3 overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Artist</th>
						<th>Title</th>
						<th>Track</th>
						<th>Likes</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{media.map((track) => (
						<ProfileMedia track={track} key={track.id} />
					))}
				</tbody>
			</table>
		</div>
	);
};
export default ProfileList;
