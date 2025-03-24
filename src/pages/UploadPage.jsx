import React, { useState, useCallback, memo } from "react";
import axios from "axios";
import { storeMetadata } from "../solana";
import { Keypair } from "@solana/web3.js";
import { Link, useNavigate } from "react-router-dom";

// Memoize FileUploadSection component
const FileUploadSection = memo(({ label, file, setFile, accept }) => (
  <div className="mb-6">
    <p className="text-gray-700 font-semibold mb-2">{label}</p>
    <div className="relative">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept={accept}
        className="hidden"
        id={`file-${label}`}
      />
      <label
        htmlFor={`file-${label}`}
        className="group flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
      >
        <div className="text-center">
          <div className="mb-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v20c0 4.418 3.582 8 8 8h16c4.418 0 8-3.582 8-8V14c0-4.418-3.582-8-8-8H16c-4.418 0-8 3.582-8 8zm16 4v12M16 24h16"
              />
            </svg>
          </div>
          <span className="text-gray-600">
            {file ? file.name : `Click to upload ${label}`}
          </span>
        </div>
      </label>
    </div>
  </div>
));

// Create a memoized form input component
const FormInput = memo(
  ({ label, value, onChange, type = "text", ...props }) => (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-700"
        {...props}
      />
    </div>
  )
);

const UploadPage = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [textFile, setTextFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [Category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const [isFiles, setIsFiles] = useState(true);
  const navigate = useNavigate();

  // Memoize handlers
  const handleFileChange = useCallback(
    (setter) => (e) => {
      setter(e.target.files[0]);
    },
    []
  );

  const handleInputChange = useCallback(
    (setter) => (e) => {
      setter(e.target.value);
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !title || !description || !Category) {
      alert(
        "Please fill in all required fields: User Name, Language, Description, and Category."
      );
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const uploadToIPFS = async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "70aafc4d8fd32010c96d",
            pinata_secret_api_key:
              "00c714e5d4d47d0602dd9e92f04f0cbe3ea28d5c5f85994c37cfb3d6c1e95651",
          },
        }
      );

      return response.data.IpfsHash;
    };

    try {
      // Upload files to IPFS
      const videoIPFSHash = videoFile ? await uploadToIPFS(videoFile) : null;
      const audioIPFSHash = audioFile ? await uploadToIPFS(audioFile) : null;
      const textIPFSHash = textFile ? await uploadToIPFS(textFile) : null;
      const imageIPFSHash = imageFile ? await uploadToIPFS(imageFile) : null;
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const currentDate = `${day}/${month}/${year}`;

      // Create metadata
      const metadata = JSON.stringify({
        is_initialized: true,
        name,
        title,
        description,
        videoFile: videoIPFSHash,
        audioFile: audioIPFSHash,
        textFile: textIPFSHash,
        imageFile: imageIPFSHash,
        publishDate: currentDate,
        Category,
      });

      // Replace with your payer's keypair
      const payerSecretKey = Uint8Array.from([
        11, 158, 129, 236, 162, 228, 126, 170, 139, 197, 240, 88, 159, 119, 231,
        255, 147, 219, 230, 184, 115, 95, 123, 154, 76, 125, 112, 170, 124, 203,
        229, 97, 219, 220, 38, 53, 230, 172, 8, 90, 122, 62, 239, 219, 180, 169,
        137, 177, 106, 111, 94, 68, 70, 127, 4, 169, 41, 243, 115, 57, 189, 174,
        213, 161,
      ]);

      const payer = Keypair.fromSecretKey(payerSecretKey);

      // Generate a new metadata account
      const metadataAccount = Keypair.generate();

      // Store metadata on Solana
      // console.log("Storing metadata:", metadata);
      await storeMetadata(metadata, metadataAccount, payer);

      // Success handling
      setLoading(false);
      setSuccessMessage("Data successfully sent!");
      setName("");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setAudioFile(null);
      setTextFile(null);
      setImageFile(null);
      setCategory("");

      // Simulate navigation to fetch page
      setTimeout(() => navigate("/home"), 2000);

      // console.log("Metadata stored successfully");
    } catch (error) {
      console.error("Error uploading to IPFS or storing metadata:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e3e3e3] p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Upload Data
        </h2>

        <div className="mb-8">
          <Link
            to="/home"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadSection
                label="Video"
                file={videoFile}
                setFile={setVideoFile}
                accept="video/*"
              />
              <FileUploadSection
                label="Audio"
                file={audioFile}
                setFile={setAudioFile}
                accept="audio/*"
              />
              <FileUploadSection
                label="Image"
                file={imageFile}
                setFile={setImageFile}
                accept="image/*"
              />
              <FileUploadSection
                label="Text"
                file={textFile}
                setFile={setTextFile}
                accept=".txt,.doc,.pdf"
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Language
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter language"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <select
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 bg-white text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="Safe">Safe</option>
                  <option value="Endangered">Endangered</option>
                  <option value="Vulnerable">Vulnerable</option>
                  <option value="Extinct">Extinct</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              {loading && (
                <div className="flex items-center justify-center p-4 text-gray-700 bg-gray-50 rounded-lg">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading data...
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}

              {!videoFile && !audioFile && !textFile && !imageFile && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                  Please select at least one file to upload.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Data"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(UploadPage);
