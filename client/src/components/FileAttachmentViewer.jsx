import React from "react";

const FileAttachmentViewer = ({ attachment }) => {
  const getFileType = (filepath) => {
    if (!filepath) return "unknown";
    const extension = filepath.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension))
      return "image";
    return "other";
  };

  const fileType = getFileType(attachment.filepath);

  const renderAttachment = () => {
    switch (fileType) {
      case "image":
        return (
          <div className="relative group">
            <img
              src={attachment.filepath}
              alt={attachment.filename || "Attachment"}
              className="rounded-lg shadow-md object-contain max-h-[500px] w-full"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => window.open(attachment.filepath, "_blank")}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm shadow-sm"
              >
                Open in New Tab
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {attachment.filename || "Document"}
              </h3>
              <a
                href={attachment.filepath}
                download={attachment.filename}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block text-sm"
                onClick={(e) => {
                  if (!attachment.filepath) {
                    e.preventDefault();
                    alert("File download URL is not available");
                  }
                }}
              >
                Download File
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium text-gray-600">
        {attachment.filename || "Unnamed file"}
      </div>
      {renderAttachment()}
    </div>
  );
};

export default FileAttachmentViewer;
