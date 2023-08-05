type Media = {
	id: string;
	title: string;
	artist: string;
	description: string;
	url: string;
	thumbnail: string;
	createdAt: string;
	user: User;
};

type User = {
	id: string;
	name: string;
	email: string;
	media: [Media];
};
