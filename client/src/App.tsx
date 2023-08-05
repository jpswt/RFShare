import './App.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navbar />
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
