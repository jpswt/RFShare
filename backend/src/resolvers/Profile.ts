import { Context } from '..';

interface ProfileType {
	id: number;
	bio: string;
	userId: number;
}
// query to gather user info from parent Profile via userId
export const Profile = {
	user: (parent: ProfileType, args: any, { prisma }: Context) => {
		return prisma.user.findUnique({
			where: {
				id: parent.userId,
			},
		});
	},
};
