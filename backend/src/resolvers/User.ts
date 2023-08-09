import { Context } from '..';

interface UserParent {
	id: number;
}

export const User = {
	media: (parent: UserParent, args: any, { prisma }: Context) => {
		return prisma.media.findMany({
			where: {
				musicianId: parent.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	},

	profile: (parent: UserParent, args: any, { prisma }: Context) => {
		return prisma.profile.findUnique({
			where: {
				userId: parent.id,
			},
		});
	},
};
