import React from "react";

const Modal = ({ isOpen, onClose, contentUrl, contentType }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (contentType) {
      case "image":
        return (
          <img src={contentUrl} alt="Modal Content" className="w-full h-auto" />
        );
      case "video":
        return (
          <video controls className="w-full h-auto">
            <source src={contentUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "audio":
        return (
          <audio controls className="w-full">
            <source src={contentUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      case "file":
        return (
          <a
            href={contentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Open File
          </a>
        );
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] md:w-[70%]">
        <button
          className="absolute top-2 right-2 text-white text-6xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Modal;
