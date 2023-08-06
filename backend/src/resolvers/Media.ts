import { Context } from '..';
import { userLoader } from '../utils/userLoader';
interface MediaParent {
	musicianId: number;
	id: string;
}

// Before n+1 data loader
// export const Media = {
// 	user: (parent: MediaParent, args: any, { prisma }: Context) => {
// 		return prisma.user.findUnique({
// 			where: {
// 				id: parent.musicianId,
// 			},
// 		});
// 	},
// };

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
};
