export const typeDefs = `#graphql
type Query {
    media: [Media!]!
    mediaLikes(mediaId: ID!):Media
    personal:User
    profile(userId: ID!): Profile
}

type Mutation {
    mediaCreate(media: MediaInput!): MediaPayload!
    mediaUpdate(mediaId: ID!, media:MediaInput): MediaPayload!
    mediaDelete(mediaId: ID!): MediaPayload!
    userRegister(credentials: AuthInput!, name:String!): AuthPayload!
    userLogin(credentials: AuthInput!): AuthPayload!
    likeMedia(mediaId:ID!):MediaPayload!
    unLikeMedia(mediaId:ID!):MediaPayload!
}

type Media {
    id:ID!
    title: String!
    artist: String!
    description: String!
    url: String!
    thumbnail: String
    createdAt:String!
    user:User!
    likes:[Like!]!
    likesCount:Int!
}

type User {
    id:ID!
    name:String!
    email:String!
    media:[Media!]!
}

# access user info through profile, not the other way around
type Profile {
    id:ID!
    bio:String
    image:String
    currentProfile:Boolean!
    user:User!
}

type Like {
    media: Media!
    mediaId:Int!
    userId:Int!
    user: User!
}

type UserError{
    message:String!
}

type LikePayload{
    userErrors:[UserError!]!
    like: Like
}

type MediaPayload{
    userErrors: [UserError!]!
    media:Media
}

type AuthPayload{
    userErrors: [UserError!]!
    token:String
}

input MediaInput{
    title:String
    artist:String
    description:String
    url: String
    thumbnail: String
}

input AuthInput{
    email:String
    password:String
}
`;
