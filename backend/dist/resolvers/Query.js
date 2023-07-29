export const Query = {
    media: (parent, args, { prisma }) => {
        return prisma.media.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        });
    },
};
