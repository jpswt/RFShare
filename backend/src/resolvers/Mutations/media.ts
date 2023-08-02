import { Media, Like, Prisma } from '@prisma/client';
import { Context } from '../../index';
import { authorizedToUpdate } from '../../lib/authUpdate';

interface MediaArgs {
	media: {
		title?: string;
		artist?: string;
		description?: string;
		url?: string;
		thumbnail?: string;
	};
}

interface MediaPayloadType {
	userErrors: {
		message: string;
	}[];
	media: Media | Prisma.Prisma__MediaClient<Media> | null;
}

interface LikeMediaArgs {
	mediaId: string;
}

export const mediaResolvers = {
	mediaCreate: async (
		parent: any,
		{ media }: MediaArgs,
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		const { title, artist, url, description, thumbnail } = media;
		// Items must be included for media upload
		if (!title || !artist || !url) {
			return {
				userErrors: [
					{
						message: 'You must include title,artist and url to upload media',
					},
				],
				media: null,
			};
		}

		if (!userInfo) {
			return {
				userErrors: [
					{
						message: 'Access Denied (Authentication Error)',
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
					//musicianId must be included to determine who the post belongs to
					musicianId: userInfo.userId,
				},
			}),
		};
	},
	mediaUpdate: async (
		parent: any,
		{ mediaId, media }: { mediaId: string; media: MediaArgs['media'] },
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		const { title, artist, description, url, thumbnail } = media;
		// No fields are updated
		if (!title || !artist || !url) {
			return {
				userErrors: [
					{
						message: 'You must include title,artist and url to upload media',
					},
				],
				media: null,
			};
		}

		// check if user is author of media content before allowing them to modify
		const authorizationError = await authorizedToUpdate({
			userId: Number(userInfo.userId),
			mediaId: Number(mediaId),
			prisma,
		});

		if (authorizationError) {
			return authorizationError;
		}

		// Not a matching mediaID to update
		const matchingMedia = await prisma.media.findUnique({
			where: {
				id: Number(mediaId),
			},
		});
		if (!matchingMedia) {
			return {
				userErrors: [
					{
						message: 'Not media matching request found',
					},
				],
				media: null,
			};
		}

		//Set Update Payload
		const updatePayload = {
			title,
			artist,
			description,
			url,
			thumbnail,
		};

		//Determine if obj.type has been updated, if not remove from payload
		if (!title) delete updatePayload.title;
		if (!artist) delete updatePayload.artist;
		if (!description) delete updatePayload.description;
		if (!url) delete updatePayload.url;
		if (!thumbnail) delete updatePayload.thumbnail;

		//update with payload

		return {
			userErrors: [],
			media: prisma.media.update({
				data: {
					...updatePayload,
				},
				where: {
					id: Number(mediaId),
				},
			}),
		};
	},
	mediaDelete: async (
		parent: any,
		{ mediaId }: { mediaId: string },
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		const media = await prisma.media.findUnique({
			where: {
				id: Number(mediaId),
			},
		});
		// Check if post exists
		if (!media) {
			return {
				userErrors: [
					{
						message: 'Not media matching request found',
					},
				],
				media: null,
			};
		}

		// check if user is author of media content before allowing them to modify
		const authorizationError = await authorizedToUpdate({
			userId: Number(userInfo.userId),
			mediaId: Number(mediaId),
			prisma,
		});

		if (authorizationError) {
			return authorizationError;
		}
		// if posts exists
		await prisma.media.delete({
			where: {
				id: Number(mediaId),
			},
		});
		return {
			userErrors: [
				{
					message: `Media with id: ${mediaId} has been deleted`,
				},
			],
			media: null,
		};
	},
	likeMedia: async (
		parent: any,
		{ mediaId }: LikeMediaArgs,
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		await prisma.like.upsert({
			create: {
				mediaId: Number(mediaId),
				userId: userInfo.userId,
			},
			update: {},
			where: {
				userId_mediaId: { userId: userInfo.userId, mediaId: Number(mediaId) },
			},
		});
		return {
			userErrors: [
				{
					message: `Media with id: ${mediaId} has been liked by user ${userInfo.userName}`,
				},
			],
			media: null,
		};
	},
	unLikeMedia: async (
		parent: any,
		{ mediaId }: LikeMediaArgs,
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		await prisma.like.delete({
			where: {
				userId_mediaId: {
					mediaId: Number(mediaId),
					userId: userInfo.userId,
				},
			},
		});
		return {
			userErrors: [
				{
					message: `Media with id: ${mediaId} has been unliked by user ${userInfo.userName}`,
				},
			],
			media: null,
		};
	},
};
