import { Context } from '..';
import { Media, Like, Prisma } from '@prisma/client';

interface LikeMediaArgs {
	mediaId: string;
}

export const Query = {
	media: (parent: any, args: any, { prisma }: Context) => {
		return prisma.media.findMany({
			orderBy: [
				{
					createdAt: 'desc',
				},
			],
		});
	},
	mediaLikes: async (
		parent: any,
		{ mediaId }: LikeMediaArgs,
		{ prisma }: Context
	) => {
		const media = await prisma.media.findUnique({
			where: {
				id: Number(mediaId),
			},
			include: {
				likes: true,
			},
		});
		return {
			...media,
			likesCount: media.likes.length,
		};
	},
};
