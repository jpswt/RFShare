type trackProps = {
	track: Media;
};

const Media = ({ track }: trackProps) => {
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
			<td>
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-bold">{track.artist}</div>
						{track?.likes?.length}
					</div>
				</div>
			</td>
			<td>{track.title}</td>
			<td>{track.url}</td>
			<th>
				<button className="btn btn-ghost btn-xs">details</button>
			</th>
		</tr>
	);
};
export default Media;
