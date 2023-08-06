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
	personal: (parent: any, args: any, { prisma, userInfo }: Context) => {
		if (!userInfo) return null;
		return prisma.user.findUnique({
			where: {
				id: Number(userInfo.userId),
			},
		});
	},
	profile: async (
		parent: any,
		{ userId }: { userId: string },
		{ prisma, userInfo }: Context
	) => {
		//determine logged in user
		const currentProfile = Number(userId) === userInfo?.userId;
		const profile = await prisma.profile.findUnique({
			where: {
				id: Number(userId),
			},
		});

		if (!profile) return null;

		return {
			...profile,
			currentProfile,
		};
	},
};
