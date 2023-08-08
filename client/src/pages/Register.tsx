import { FormEvent, useEffect, useState } from 'react';
import { USER_REGISTER } from '../queries/query';
import { useMutation } from '@apollo/client';

const Register = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');

	const [userRegister, { data, loading }] = useMutation(USER_REGISTER);
	console.log(data);

	const [error, setError] = useState(null);
	console.log(email, password, name);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		userRegister({
			variables: {
				email: email,
				password: password,
				name: name,
			},
		});
	};

	useEffect(() => {
		if (data) {
			if (data.userRegister.userErrors.length) {
				setError(data.userRegister.userErrors[0].message);
			}
		}
	}, [data]);

	return (
		<div className=" flex h-screen flex-col items-center justify-center">
			<form
				className=" flex w-screen flex-col items-center justify-center gap-4"
				onSubmit={handleSubmit}
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
				<div>
					<input
						type="text"
						placeholder="Name"
						className="input input-bordered input-primary w-80 max-w-md"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				{error && <p>{error}</p>}
				<button type="submit" className="btn btn-primary">
					Primary
				</button>
			</form>
		</div>
	);
};
export default Register;
