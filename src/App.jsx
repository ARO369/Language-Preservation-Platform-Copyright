import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchJson from "./solana";

const App = () => {
  const [userPublicKey, setUserPublicKey] = useState(null);
  const [prefetchedData, setPrefetchedData] = useState([]);

  useEffect(() => {
    const prefetchData = async () => {
      try {
        const data = await fetchJson(true);
        setPrefetchedData(data);
      } catch (error) {
        console.error("Error prefetching data:", error);
      }
    };

    // Use requestIdleCallback for non-critical data fetching
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => prefetchData());
    } else {
      setTimeout(prefetchData, 1);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-10 pb-12">
        <h1 className="text-gray-900 text-4xl md:text-4xl font-bold mb-8 font-silkscreen">
          LANGUAGE PRESERVATION PLATFORM USING BLOCKCHAIN
        </h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 text-xl mb-12 italic">
            "Preserving Languages, Securing Culture - A Decentralized Archive
            for Endangered Voices"
          </p>

          <div className="mt-8">
            <Link
              to="/home"
              state={{ prefetchedData }}
              className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-3 rounded-lg text-2xl font-bold transition-colors duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-2">
        <div className="relative w-full max-w-3xl h-56">
          <div className="absolute top-0 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-70"></div>
          <div className="absolute top-12 left-1/2 w-24 h-24 bg-purple-400 rounded-full opacity-70"></div>
          <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-green-400 rounded-full opacity-70"></div>
          <div className="absolute top-16 right-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-70"></div>
          <div className="absolute bottom-16 right-1/3 w-20 h-20 bg-red-400 rounded-full opacity-70"></div>

          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="25%"
              y1="8"
              x2="50%"
              y2="24"
              stroke="gray"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="50%"
              y1="24"
              x2="33%"
              y2="144"
              stroke="gray"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="50%"
              y1="24"
              x2="75%"
              y2="24"
              stroke="gray"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="33%"
              y1="144"
              x2="66%"
              y2="144"
              stroke="gray"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <div className="flex justify-center items-center">
                <h3 className="text-xl font-semibold mb-2">Developed By:</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-3 py-1 bg-gray-800 rounded">
                  Aaradhya Pathak
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded">
                  Sanchit Thakare
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded">
                  Fareesuz Zama
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded">
                  Tanmay Kamdi
                </span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">
                Under the Guidance of:
              </h3>
              <p className="text-gray-300">Prof. Rupali Meshram</p>
            </div>

            <p className="mt-6 text-sm text-gray-400">
              © {new Date().getFullYear()} Language Preservation Platform. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RootApp = () => <App />;

export default RootApp;
