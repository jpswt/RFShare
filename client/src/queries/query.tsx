import { gql } from '@apollo/client';

export const GET_MEDIA2 = gql`
	query MediaWithUser {
		media {
			id
			title
			artist
			description
			url
			thumbnail
			createdAt
			likesCount
			likes {
				mediaId
				userId
			}
			likedByCurrentUser
			user {
				id
				name
				email
			}
		}
	}
`;

export const GET_PROFILE = gql`
	query GetProfile($userId: ID!) {
		profile(userId: $userId) {
			bio
			image
			currentProfile
			user {
				id
				name
				media {
					id
					thumbnail
					title
					artist
					description
					url
					createdAt
					likesCount
				}
			}
		}
	}
`;

export const LIKE_MEDIA = gql`
	mutation LikeMedia($mediaId: ID!) {
		likeMedia(mediaId: $mediaId) {
			userErrors {
				message
			}
			media {
				id
			}
		}
	}
`;

export const DISLIKE_MEDIA = gql`
	mutation UnLikeMedia($mediaId: ID!) {
		unLikeMedia(mediaId: $mediaId) {
			userErrors {
				message
			}
			media {
				id
			}
		}
	}
`;

export const USER_REGISTER = gql`
	mutation RegisterUser($email: String!, $password: String!, $name: String!) {
		userRegister(
			credentials: { email: $email, password: $password }
			name: $name
		) {
			userErrors {
				message
			}
			token
		}
	}
`;

export const USER_LOGIN = gql`
	mutation LoginUser($email: String!, $password: String!) {
		userLogin(credentials: { email: $email, password: $password }) {
			userErrors {
				message
			}
			token
		}
	}
`;

export const CREATE_MEDIA = gql`
	mutation CreateMedia(
		$title: String!
		$description: String!
		$url: String!
		$thumbnail: String
	) {
		mediaCreate(
			media: {
				title: $title
				description: $description
				url: $url
				thumbnail: $thumbnail
			}
		) {
			userErrors {
				message
			}
			media {
				id
				title
				description
				createdAt
			}
		}
	}
`;
