import gql from "graphql-tag";

export const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      full_name
      userName
      email
      address
      city
      imageUrl
    }
  }
`;

export const GET_ALL_USERS = gql`
  query allUsers {
    allUsers {
      userName
      imageUrl
      id
    }
  }
`;

export const GET_USER_IMAGES = gql`
  query user($id: Int!) {
    user(id: $id) {
      userName
      imageUrl
      id
    }
  }
`;

export const GET_USER_IMAGE = gql`
  query user($id: Int!) {
    user(id: $id) {
      image
    }
  }
`;

export const GET_MESSAGES = gql`
  query chatMessage($id: Int!) {
    chatMessage(id: $id) {
      id
      message
      imageUrl
      imageUrlRecipient
      userId
      recipientId
      recipientName
      sender {
        id
        userName
        imageUrl
      }
      recipient {
        id
        userName
        imageUrl
      }
    }
  }
`;

export const GET_ALL_MESSAGES = gql`
  query user($id: Int!) {
    user(id: $id) {
      sender {
        userId
        message
      }
      recipient {
        recipientId
        recipientName
        message
      }
    }
  }
`;

export const GET_ALL_DOGS = gql`
  query allDogs {
    allDogs {
      id
      name
      gender
      imageUrl
      tagLine
      ownerId
      owner {
        userName
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ALL_USER_DOGS = gql`
  query allDogsUser($id: Int!) {
    allDogsUser(id: $id) {
      id
      name
      gender
      imageUrl
      tagLine
      tags {
        id
        name
      }
      dogLike {
        liked
      }
    }
  }
`;

export const GET_ALL_DOG_IMAGE = gql`
  query {
    allDogs {
      id
      name
      imageUrl
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $userId: Int!
    $message: String!
    $recipientId: Int!
    $recipientName: String!
    $imageUrl: String
  ) {
    sendMessage(
      userId: $userId
      message: $message
      recipientId: $recipientId
      recipientName: $recipientName
      imageUrl: $imageUrl
    ) {
      id
      userId
      message
      recipientId
      recipientName
      imageUrl
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $full_name: String!
    $userName: String!
    $email: String!
    $password: String!
    $address: String!
    $city: String!
    $imageUrl: String!
  ) {
    register(
      full_name: $full_name
      userName: $userName
      email: $email
      password: $password
      address: $address
      city: $city
      imageUrl: $imageUrl
    ) {
      userName
      email
    }
  }
`;

export const REGISTER_DOG = gql`
  mutation registerDog(
    $name: String!
    $gender: String!
    $tagLine: String!
    $imageUrl: String!
    $ownerId: Int!
  ) {
    registerDog(
      name: $name
      gender: $gender
      tagLine: $tagLine
      imageUrl: $imageUrl
      ownerId: $ownerId
    ) {
      name
    }
  }
`;

export const LOGIN_USER = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      userName
      email
      imageUrl
      token
    }
  }
`;

export const SUB_MESSAGE = gql`
  subscription chatMessage($userId: Int!, $recipientId: Int!) {
    chatMessage(userId: $userId, recipientId: $recipientId) {
      message
      imageUrl
      imageUrlRecipient
      userId
      recipientId
      recipientName
      sender {
        id
        userName
        imageUrl
      }
      recipient {
        id
        userName
        imageUrl
      }
    }
  }
`;
