import { FormEvent, useEffect, useState } from 'react';
import { USER_LOGIN } from '../queries/query';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const [userLogin, { data }] = useMutation(USER_LOGIN);
	console.log(data);

	const [error, setError] = useState(null);
	console.log(email, password);

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			userLogin({
				variables: {
					email: email,
					password: password,
				},
			});
			navigate('/media');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (data) {
			if (data.userLogin.userErrors.length) {
				setError(data.userLogin.userErrors[0].message);
			}
			if (data.userLogin.token) {
				localStorage.setItem('token', data.userLogin.token);
			}
		}
	}, [data]);

	return (
		<div className=" flex h-screen flex-col items-center justify-center">
			<form
				className=" flex w-screen flex-col items-center justify-center gap-4"
				onSubmit={handleLogin}
			>
				<div>
					<input
						type="text"
						placeholder="Email "
						className="input input-bordered input-primary w-80 max-w-md"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Password"
						className="input input-bordered input-primary w-80 max-w-md"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && <p>{error}</p>}
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
};
export default Login;
