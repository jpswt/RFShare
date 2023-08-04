import JWT from 'jsonwebtoken';

export const decodeToken = (token: string) => {
	try {
		return JWT.verify(token, process.env.JWTSECRET) as {
			userId: number;
			userName: string;
		};
	} catch (error) {
		null;
	}
};
