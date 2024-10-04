'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHATS } from '../graphql/queries';

interface Chat {
  id: number;
  name: string;
  lastMessage: string | null;
  time: string;
  unread: number;
  user: {
    id: number;
    name: string;
  };
}

export const ChatScreenDynamic: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Chats</h2>
      {data.chats.edges.map(({ node }: { node: Chat }) => (
        <div key={node.id}>
          <h3>{node.name}</h3>
          <p>Last message: {node.lastMessage}</p>
          <p>Time: {new Date(node.time).toLocaleString()}</p>
          <p>Unread: {node.unread}</p>
          <p>User: {node.user.name}</p>
        </div>
      ))}
    </div>
  );
};