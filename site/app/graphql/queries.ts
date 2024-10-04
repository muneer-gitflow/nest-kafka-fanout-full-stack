import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query GetChats {
    chats {
      edges {
        node {
          id
          name
          lastMessage
          time
          unread
          user {
            id
            name
          }
        }
      }
    }
  }
`;