import { Context } from '..';

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
};
