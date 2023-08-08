type Media = {
	id: string;
	title: string;
	artist: string;
	description: string;
	url: string;
	thumbnail: string;
	createdAt: string;
	user: User;
	likes: [Like];
	likesCount: number;
	likedByCurrentUser: boolean;
};

type User = {
	id: string;
	name: string;
	email: string;
	media: [Media];
};

type Like = {
	media: Media;
	user: User;
	mediaId: number;
	userId: number;
	createdAt: string;
};
