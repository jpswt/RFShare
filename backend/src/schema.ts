export const typeDefs = `#graphql
type Query {
    media: [Media!]!
}

type Mutation {
    mediaCreate(media: MediaInput!): MediaPayload!
    mediaUpdate(mediaId: ID!, media:MediaInput): MediaPayload!
    mediaDelete(mediaId: ID!): MediaPayload!
    userRegister(credentials: AuthInput!, name:String!): AuthPayload!
    userLogin(credentials: AuthInput!): AuthPayload!
    likeMedia(mediaId:ID!, media: MediaInput): MediaPayload!
}

type Media {
    id:ID!
    title: String!
    artist: String!
    description: String!
    url: String!
    thumbnail: String
    createdAt:String!
    likes:[User!]!
    user:User!
}

# type Like {
#     id: ID!
#     username: String!
#     createAt:String!
# }

type User {
    id:ID!
    name:String!
    email:String!
    profile:Profile
    media:[Media!]!
    likedMedia:[Media!]!
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
