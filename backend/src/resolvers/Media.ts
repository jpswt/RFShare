import { Context } from '..';
import { userLoader } from '../utils/userLoader';
interface MediaParent {
	musicianId: number;
	id: string;
}

export const Media = {
	user: (parent: MediaParent, args: any, { prisma }: Context) => {
		return userLoader.load(parent.musicianId);
	},
	likesCount: (parent: MediaParent, args: any, { prisma }: Context) => {
		return prisma.like.count({
			where: {
				mediaId: Number(parent.id),
			},
		});
	},
	likes: async (parent: MediaParent, args: any, { prisma }: Context) => {
		const media = await prisma.media.findUnique({
			where: {
				id: Number(parent.id),
			},
			include: {
				likes: true,
			},
		});

		const likes = media?.likes || [];

		console.log('Media:', media);
		console.log('Likes:', media?.likes);

		// const validLikes = likes.map((like) => ({
		// 	...like,
		// 	mediaId: like.mediaId || '', // Ensure createdAt is never null
		// }));

		return likes;
	},
};
