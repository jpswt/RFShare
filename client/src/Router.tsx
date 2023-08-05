import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MediaSubs from './pages/MediaSubs';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Register />}></Route>
			<Route path="/media" element={<MediaSubs />}></Route>
		</Routes>
	);
};
export default Router;
