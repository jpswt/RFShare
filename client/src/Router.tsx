import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MediaSubs from './pages/MediaSubs';
import Profile from './pages/Profile';
import Login from './pages/Login';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Register />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/media" element={<MediaSubs />}></Route>
			<Route path="/profile/:id" element={<Profile />}></Route>
		</Routes>
	);
};
export default Router;
