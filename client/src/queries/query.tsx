import { gql } from '@apollo/client';

export const GET_MEDIA = gql`
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
			user {
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
			user {
				id
				name
				media {
					id
					thumbnail
					title
					description
					url
					createdAt
				}
			}
		}
	}
`;
