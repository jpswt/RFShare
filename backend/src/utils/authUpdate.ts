import { Context, prisma } from '../index';

interface AuthUpdateArgs {
	mediaId: number;
	userId: number;
	prisma: Context['prisma'];
}

export const authorizedToUpdate = async ({
	mediaId,
	userId,
}: AuthUpdateArgs) => {
	//get user from prisma
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return {
			userErrors: [
				{
					message: 'User does not exitst',
				},
			],
			media: null,
		};
	}

	// find media if user exists
	const media = await prisma.media.findUnique({
		where: {
			id: mediaId,
		},
	});

	// check if current user matches the user of the media
	if (media?.musicianId !== user.id) {
		return {
			userErrors: [
				{
					message: 'Not authorized to modify this media content',
				},
			],
			media: null,
		};
	}
};
