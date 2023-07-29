export const typeDefs = `#graphql
type Query {
    media: [Media!]!
}

type Mutation {
    mediaCreate(media: MediaInput!): MediaPayload!
}

type Media {
    id:ID!
    title: String!
    artist: String!
    description: String!
    url: String!
    thumbnail: String
    createdAt:String!
    liked:Boolean
}

type User {
    id:ID!
    name:String!
    email:String!
    profile:Profile
    media:[Media!]!
}

type Profile {
    id:ID!
    bio:String
    image:String
    user:User!
}

type UserError{
    message:String!
}

type MediaInput{
    title:String
    artist:String
    description:String
    url: String
    thumbnail: String
}

type MediaPayload{
    userErrors: [UserError!]!
    media:Media
}
`;
