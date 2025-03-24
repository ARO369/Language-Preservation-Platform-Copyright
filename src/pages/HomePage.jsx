import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import fetchJson from "../solana";
// Lazy load the Modal component
const Modal = lazy(() => import("../components/Modal"));

// Import loading animation with explicit width and height
const loadingAnimation = new URL(
  "../assets/loading_Animation.gif",
  import.meta.url
).href;

// Memoize category colors
const categoryColors = {
  Safe: "bg-green-100 text-green-800",
  Endangered: "bg-red-100 text-red-800",
  Vulnerable: "bg-yellow-100 text-yellow-800",
  Extinct: "bg-gray-100 text-gray-800",
};

const HomePage = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState({});
  const [modalData, setModalData] = useState({
    isOpen: false,
    url: "",
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchJson(true);
        setOriginalData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredData(originalData);
    } else {
      setFilteredData(
        originalData.filter(
          (item) => item.category && item.category === category
        )
      );
    }
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleOpenModal = (url, type) => {
    setModalData({
      isOpen: true,
      url,
      type,
    });
  };

  const handleCloseModal = () => {
    setModalData({
      isOpen: false,
      url: "",
      type: "",
    });
  };

  const searchedData = filteredData.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.title &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category &&
        item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f5f5f5]">
        <div className="animate-pulse flex justify-center items-center">
          <img src={loadingAnimation} alt="loading..." width="50" />
          <h2 className="ml-4 text-4xl font-bold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    return categoryColors[category] || "bg-blue-100 text-blue-800";
  };

  return (
    <div className="min-h-screen bg-[#e3e3e3] p-4 w-full xl:w-full">
      <h2 className="text-center text-5xl font-bold text-gray-800 mb-8 animate-fade-in">
        Fetch Data
      </h2>
      <div className="flex justify-between items-center xl:mx-10">
        <Link
          to="/"
          className="bg-gray-800 text-white px-8 py-2 rounded-lg text-2xl font-bold transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
        >
          Back
        </Link>
        <Link
          to="/upload"
          className="bg-gray-800 text-white px-8 py-2 rounded-lg text-2xl font-bold transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
        >
          Upload
        </Link>
      </div>
      <div className="flex justify-center items-center mt-12">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="p-4 w-[90%] xl:w-[60%] text-gray-800 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all duration-300 placeholder-gray-400 shadow-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-wrap justify-center gap-4 xl:w-[60%]">
          {["All", "Safe", "Endangered", "Vulnerable", "Extinct"].map(
            (category) => (
              <button
                key={category}
                className="bg-gray-800 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>
      <div className="flex xl:justify-center xl:items-center mt-10">
        <div className="xl:w-[60%]">
          {searchedData.length > 0 ? (
            <div className="grid gap-6">
              {searchedData.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                >
                  <div className="p-6 rounded-2xl bg-black/85  border border-white shadow-lg shadow-black/20">
                    <div className="flex justify-end mb-4">
                      <span
                        className={`${getCategoryColor(
                          item.category
                        )} px-4 py-2 rounded-lg text-sm font-semibold bg-white/2  text-gray-200`}
                      >
                        {item.category || "No Category"}
                      </span>
                    </div>
                    <h3 className="text-4xl font-bold text-white/90 mb-4 leading-tight drop-shadow-md">
                      {item.title || "No Title"}
                    </h3>
                    <p className="text-lg text-gray-300 font-semibold mb-2">
                      {item.name || "No Name"}
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {expanded[index]
                        ? item.description
                        : `${(item.description || "No Description").slice(
                            0,
                            100
                          )}...`}
                      <button
                        className="ml-2 text-blue-400 hover:text-blue-500 transition-colors duration-300"
                        onClick={() => toggleExpand(index)}
                      >
                        {expanded[index] ? "Read Less" : "Read More"}
                      </button>
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6">
                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600/90 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-md"
                        >
                          View File
                        </a>
                      )}

                      {item.videoUrl && (
                        <button
                          className="bg-purple-600/90 hover:bg-purple-700 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-md"
                          onClick={() =>
                            handleOpenModal(item.videoUrl, "video")
                          }
                        >
                          Watch Video
                        </button>
                      )}

                      {item.audioUrl && (
                        <button
                          className="bg-green-600/90 hover:hover:bg-[#d3d2d2] hover:text-black px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-md"
                          onClick={() =>
                            handleOpenModal(item.audioUrl, "audio")
                          }
                        >
                          Listen Audio
                        </button>
                      )}

                      {item.imageUrl && (
                        <button
                          className="bg-[#e3e3e3] hover:bg-[#d3d2d2] px-6 py-2 rounded-lg text-black font-semibold transition-all duration-300 hover:shadow-md"
                          onClick={() =>
                            handleOpenModal(item.imageUrl, "image")
                          }
                        >
                          View Image
                        </button>
                      )}
                    </div>
                    <div className="flex justify-end mt-4 text-gray-400 text-sm">
                      {item.publishDate || "No Publish Date"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-3xl text-gray-700 text-center">
              No data found :(
            </p>
          )}
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          isOpen={modalData.isOpen}
          onClose={handleCloseModal}
          contentUrl={modalData.url}
          contentType={modalData.type}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
