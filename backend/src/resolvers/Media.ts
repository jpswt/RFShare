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
		return await prisma.like.findMany({
			where: {
				mediaId: Number(parent.id),
			},
		});
		// Return the likes array or an empty array if media is not found
	},
};
