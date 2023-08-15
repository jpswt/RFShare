import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PL = () => {
	return (
		<AudioPlayer
			autoPlay
			src="https://storage.googleapis.com/socialmedia-daf29.appspot.com/path/to/summer-walk-152722.mp3?GoogleAccessId=firebase-adminsdk-gah0d%40socialmedia-daf29.iam.gserviceaccount.com&Expires=1893477600&Signature=aO8WW8UVJNF8Hnnmn3JUhMEBkVPqFoB2dm5a5pyklDVbVyvKdyRjbkggZvFx6k%2B7aiVIFVoJP9GkNHhooRKVr3d15iv%2FgsAaNqz0Jopkz9ROEIJSAwkYQ%2FJoQk81BlAk2P4foiUqPjwKBVKALp%2FJFNcYGYLSbTF4vzeS9MgPSJ5gGclU6NOtjqHdrlk3MKFpkp69dcS5HfyK9ajPyKufMTPnwDnpf89jLGx%2FDmC9EVmpErvt71iR%2F1mugWLoJXaCvuLbz%2FbInyfb4B7UUvk0rdJ7iTQAdJsC8%2FDdINlZWbVrq%2B3kyZgJqVlDUVY3zjyRDlZn1W40oa%2BRpVBvvWKzdQ%3D%3D"
			onPlay={(e) => console.log('onPlay')}
			// other props here
		/>
	);
};
export default PL;
