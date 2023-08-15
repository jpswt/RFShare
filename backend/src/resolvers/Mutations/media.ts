import { Media, Like, Prisma } from '@prisma/client';
import { Context } from '../../index';
// import multer from 'multer';
import { authorizedToUpdate } from '../../utils/authUpdate';
// import admin from 'firebase-admin';

// admin.initializeApp({
// 	credential: admin.credential.cert({
// 		projectId: 'socialmedia-daf29',
// 		clientEmail:
// 			'firebase-adminsdk-gah0d@socialmedia-daf29.iam.gserviceaccount.com',
// 		privateKey:
// 			'-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCij1Svo6TwfCiQ\nFI9ZrKn+P5ujZlX9CqWMpzjIB8aI3Z8hxd+YWIRo/j4Qx/U5WR8hdeO85wiWSrTp\nSyoZQuvvmvVP08YS7Xq/28JmvgrzFja6Hos5Bjbklf0+9KQP2PAhtseX3YP7mte0\ngvnjvqQv47MvZz+1302IWmDum7RxlzAp2NEECe0XeQVOgmOB+BLHmg+agIS26ouv\nzEwGJKJCh83dTx7c3FKwz0pund6xXH8OSZL5amzzOBpq3KgzdXYNdlSEZMYlmx3L\nJh55e+kDhVymGN2aCGqSZ9mEYVliRJjzmUxR3eCGlnWZtW57dEWnBHXCUyT6IN+W\n+/EWAKh5AgMBAAECggEAFvFWuPFGKqDDUs5sCvJ5DYapry6WzT9O7SJ+u5CJXzC0\nMF6Od6Bqk6zqUpD+Falz4NOUIEmVJy0FCnYOy4Dr7qW2oJ0Zc/trWx+neLuyrOtC\nLxN3f8VWQv2+P7/kVc4+2etDkTX01jJc5j+kCBYUcyPWWsbeMYuCFE/5JUP5fBxq\nOF/p7VNzzNd42gAKD2SEY+rnmGznI7sNBJve7c5DRJqrvJxjpQT+LxQM2UN76TQC\n6Xa+LW5iT0f+Jd0uTpN5Ozz6uaMqPTUE+n6todlzr9MHpgO0wKOpJMjsJw2Yw1tb\nYwYxGZl0fEFNCv1mMHH6jSvpYjAR0OdO1/Vk6JYXrwKBgQDa5PfUjIRCqubhzO3R\nBOfXrCFUzXVfMuDMKNhLja2uPn/E32xC6NENHQXx/2SQ/C7TntnOi9sas6PG3iNZ\nT3bFOwXlbcwpSi87pLMspMmAAZWVERcU6l3HoSPnM3aGutCVP/EzPbP5NdF0e6Rp\nLM5CXsLvKWaQnfsxmt4kRv3zNwKBgQC+HbK3KBeMcQwJlldcy/R9k2qSjJjoP6gG\n6n9FtsZGH669N7pcRGag5WnxusmCt9n09dw+er8Ox9p54vTynyPhXKc1RHXTcKZK\nepjb3kVY59hL2Zveg5C8lju985jHayChVyS9GXZcAq8vvtS4lyTpqbHIaTI3FrAZ\npEMyEOx5zwKBgF4nqyq0HpgGpzVtTsZf09IDanrtvZTrb6Kh1xf4o0KWA6ONbyYA\nuxtm5o3Hi1yJ/SJt68Zahi6gIsyB9LaP5cjEsK6VYgJItLR1DdUgNMRo6gyqw0Dt\n5tTdzXG/wzYE2X+5d2jRG78QlT4DiR7sdPQ7iqIRLtr5+XjG4tK77rRVAoGAIGTx\nEdJsCMsucOfEJRS/qTIYQ7ZfS5ulJuCIJTnamRJG9Qjs4VHqZtoQblcUhQiMw/es\nupyxt3QIXyJz+G9zbrAZ8bKjnQ6h1ykCqNw71sVSjsIalBS48dlrfpdmXfx8B+HQ\nacRP7aercChFGNrwODxpBawfGVHtWcEqjfpiQPMCgYBMmrgcO1NvgDLy49TDECn1\neeyUJv+Se1BD913ztPa6LO0HORLeX97ZIITnfUKPPYMXezpWUpxd3fAvW2fBHcRC\ndjAnkd53bqizyqQ8XjPvQfdUbWQmioHIZKxjvRsl2u5hr43K6ZW/+GHFFS1vAunO\n0VSHh7E+dpgFk0gJHVgTOA==\n-----END PRIVATE KEY-----\n',
// 	}),
// 	storageBucket: 'socialmedia-daf29.appspot.com',
// });

// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: 'AIzaSyDWJZjeGHp1hKwhJGuY_n4k89-4hKiCzCc',
// 	authDomain: 'socialmedia-daf29.firebaseapp.com',
// 	projectId: 'socialmedia-daf29',
// 	storageBucket: 'socialmedia-daf29.appspot.com',
// 	messagingSenderId: '790362175597',
// 	appId: '1:790362175597:web:f9e4ff328e33b4c50ce764',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage();
// const upload = multer({ storage: multer.memoryStorage() });

interface MediaArgs {
	media: {
		title?: string;
		artist?: string;
		description?: string;
		url?: string;
		thumbnail?: string;
	};
	// file: any;
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

// async function uploadMedia(url: string, bucket: any) {
// 	// Use Firebase SDK to upload media and get the download URL
// 	// Implement your Firebase upload logic here
// 	// Example:
// 	const file = bucket.file(`/media/${url}`);
// 	await file.save(url);
// 	const [firebaseUrl] = await file.getSignedUrl({
// 		action: 'read',
// 		expires: '01-01-2030',
// 	});
// 	return firebaseUrl;
// }

export const mediaResolvers = {
	mediaCreate: async (
		parent: any,
		{ media }: MediaArgs,
		{ prisma, userInfo }: Context
	): Promise<MediaPayloadType> => {
		const { title, artist, url, description, thumbnail } = media;

		// const fileBuffer = file?.buffer; // Access the uploaded file buffer
		// if (!fileBuffer) {
		// 	return {
		// 		userErrors: [
		// 			{
		// 				message: 'File buffer not found',
		// 			},
		// 		],
		// 		media: null,
		// 	};
		// }
		// const filePath = `media/${file.originalname}`; // Define the storage path
		// const fileRef = ref(storage, filePath); // Create a reference to the storage location
		// await uploadBytes(fileRef, fileBuffer);

		// const downloadURL = await getDownloadURL(fileRef);
		// const bucket = admin.storage().bucket();
		// const firebaseURL = await uploadMedia(url, bucket);
		// Items must be included for media upload
		if (!title || !description || !url) {
			return {
				userErrors: [
					{
						message:
							'You must include title,description and url to upload media',
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
					artist: userInfo.userName,
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

// export const mediaLikesCount = {
// 	likesCount: (parent: { likes: Like[] | null }) => {
// 		return parent?.likes?.length ?? 10;
// 	},
// };
