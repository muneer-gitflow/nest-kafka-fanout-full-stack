import React from "react";
import { Check, CheckCheck, Forward, Trash2 } from "lucide-react";
import { Message, MessageStatus } from "../types/chat";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "text":
        return <p>{message.content}</p>;
      case "link":
        return (
          <a
            href={message.content as string}
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.content}
          </a>
        );
      case "image":
        return (
          <img
            src={message.content as string}
            alt="Shared image"
            className="max-w-full h-auto rounded-lg"
          />
        );
      case "video":
        return (
          <video controls className="max-w-full h-auto rounded-lg">
            <source src={message.content as string} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "multiple_images":
        return (
          <div className="grid grid-cols-3 gap-1">
            {(message.content as string[]).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Shared image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        );
      case "forwarded":
        return (
          <div>
            <Forward className="w-4 h-4 inline mr-2 text-gray-400" />
            <span>{message.content}</span>
          </div>
        );
      case "deleted":
        return <p className="italic text-gray-500">{message.content}</p>;
      default:
        return <p>{message.content}</p>;
    }
  };

  const renderMessageStatus = (status: MessageStatus) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`mb-4 flex ${
        message.sender === "You" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.sender === "You" ? "bg-green-700" : "bg-gray-800"
        }`}
      >
        {renderMessage(message)}
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">{message.time}</span>
          {message.sender === "You" && renderMessageStatus(message.status)}
        </div>
      </div>
      {message.sender === "You" && (
        <button className="ml-2 text-gray-400 hover:text-gray-200">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default MessageBubble;