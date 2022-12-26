import React, {useState} from "react";
import './chat.css';
import ChatFeed from './ChatFeed';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';

const projectID = '68ba8a77-2156-4bfd-8c38-4c4d2f5bfb87';
const test = 'tanvx'

const Chat = () => {
  return (
    <ChatEngine
      height="70vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderNewChatForm={(creds) => {}}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default Chat;
