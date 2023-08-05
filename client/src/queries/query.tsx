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
			user {
				name
				email
			}
		}
	}
`;

export const MEDIA_LIKES = gql`
	query MediaLikes($mediaId: ID!) {
		mediaLikes(mediaId: $mediaId) {
			id
			title
			artist
			description
			url
			thumbnail
			createdAt
			likesCount
		}
	}
`;
