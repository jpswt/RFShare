export const mediaResolvers = {
    mediaCreate: async (parent, { media }, { prisma }) => {
        const { title, artist, description, url, thumbnail } = media;
        if (!title || !artist || !description || !url) {
            return {
                userErrors: [
                    {
                        message: 'You must provide title,artist,description and file url to upload',
                    },
                ],
                media: null,
            };
        }
        return {
            userErrors: [],
            media: await prisma.media.create({
                data: {
                    title,
                    artist,
                    description,
                    url,
                    thumbnail,
                    musicianId: 1,
                },
            }),
        };
    },
};
