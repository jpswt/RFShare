import { Context } from '../../index';
import validator from 'validator';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

interface RegisterArgs {
	credentials: {
		email: string;
		password: string;
	};
	name: string;
}

interface LoginArgs {
	credentials: {
		email: string;
		password: string;
	};
}

interface UserPayloadType {
	userErrors: {
		message: string;
	}[];
	token: string | null;
}

export const authResolvers = {
	userRegister: async (
		parent: any,
		{ credentials, name }: RegisterArgs,
		{ prisma }: Context
	): Promise<UserPayloadType> => {
		const { email, password } = credentials;

		//check for valid email
		const isEmail = validator.isEmail(email);
		if (!isEmail) {
			return {
				userErrors: [
					{
						message: 'Email is not valid, try again.',
					},
				],
				token: null,
			};
		}

		const existingEmail = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingEmail) {
			return {
				userErrors: [
					{
						message: 'Email already exists.  Please try logging in.',
					},
				],
				token: null,
			};
		}

		//check for password length longer that 8 characters
		const isPassword = validator.isLength(password, { min: 8 });
		if (!isPassword) {
			return {
				userErrors: [
					{
						message:
							'Password is not long enough.  Must be a minimum of 8 characters long, try again.',
					},
				],
				token: null,
			};
		}
		//check that name input is completed
		if (!name) {
			return {
				userErrors: [
					{
						message: 'Name is not valid or empty, try again.',
					},
				],
				token: null,
			};
		}
		// hash password
		const hash = await bcrypt.hash(password, 10);
		//create user via prisma
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hash,
			},
		});
		// sign JWT token
		const token = await JWT.sign(
			{
				userId: user.id,
				userName: user.name,
			},
			process.env.JWTSECRET
		);
		// return token if successful
		return {
			userErrors: [],
			token,
		};
	},
	userLogin: async (
		parent: any,
		{ credentials }: LoginArgs,
		{ prisma }: Context
	): Promise<UserPayloadType> => {
		const { email, password } = credentials;

		// check if user exists
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return {
				userErrors: [
					{
						message: 'Invalid credentials, please try again',
					},
				],
				token: null,
			};
		}
		// check if password is valid
		const isMatchingPassword = await bcrypt.compare(password, user.password);

		if (!isMatchingPassword) {
			return {
				userErrors: [
					{
						message: 'Invalid credentials, please try again',
					},
				],
				token: null,
			};
		}
		return {
			userErrors: [],
			token: JWT.sign(
				{ userId: user.id, userName: user.name },
				process.env.JWTSECRET
			),
		};
	},
};
