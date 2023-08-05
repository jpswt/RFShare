import { useEffect, useState } from 'react';

const Register = () => {
	return (
		<div className=" flex h-screen flex-col items-center justify-center">
			<form className=" flex w-screen flex-col items-center justify-center gap-4">
				<div>
					<input
						type="text"
						placeholder="Email "
						className="input input-bordered input-primary w-80 max-w-md"
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Password"
						className="input input-bordered input-primary w-80 max-w-md"
					/>
				</div>
			</form>
		</div>
	);
};
export default Register;
