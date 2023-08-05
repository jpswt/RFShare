import Media from './Media';

type MediaProps = {
	media: Media[];
};

const MediaList = ({ media }: MediaProps) => {
	return (
		// <div>

		// {media.map((track) => (
		// 	<Media track={track} />
		// ))}
		// </div>

		<div className="w-2/3 overflow-x-auto">
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Artist</th>
						<th>Title</th>
						<th>Track</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{media.map((track) => (
						<Media track={track} key={track.id} />
					))}
				</tbody>
			</table>
		</div>
	);
};
export default MediaList;
