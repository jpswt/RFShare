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
	profile: Profile;
};

type Like = {
	media: Media;
	user: User;
	mediaId: number;
	userId: number;
	createdAt: string;
};

type Profile = {
	id: string;
	bio: string;
	image: string;
	currentProfile: boolean;
	user: User;
};
