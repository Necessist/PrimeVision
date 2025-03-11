"use client";
import { useEffect, useState } from "react";
import { PlayIcon } from "../svgIcons";
import Link from "next/link";

const SlideShow = ({ slideData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slideData || !slideData.results) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slideData.results.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Auto-slide every 8 seconds

    return () => clearInterval(interval);
  }, [slideData]);

  if (!slideData || !slideData.results) return null;

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
      {slideData.results.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Slide Image */}
          <img
            src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
            className="w-full h-[500px] object-cover rounded-2xl opacity-60"
            alt={item.title || item.name}
          />

          {/* Blurry Popular Button */}
          <button className="absolute top-6 left-6 w-[150px] h-[38px] flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-2xl text-[16px]">
            🔥 Now Popular
          </button>

          {/* Info Section */}
          <div className="absolute left-6 bottom-6 w-fit max-w-[550px] text-white">
            <button className="px-3 h-[33px] flex gap-2 items-center justify-center bg-black/30 backdrop-blur-sm rounded-2xl">
              <span>TMDB</span>
              <span className="opacity-70">{item.vote_average}</span>
            </button>

            {/* Movie/TV Show Title */}
            <h1 className="text-[27px] font-bold mt-3">
              {item.title || item.name}
            </h1>

            {/* Overview */}
            <p className="mt-1 text-[16px] opacity-80 line-clamp-4">
              {item.overview}
            </p>

            {/* Watch Button */}
            <div className="flex gap-3 mt-3">
              <Link
                href={`/watch/movie?id=${item.id}}`}
                className="w-[160px] h-[40px] bg-white text-black flex items-center gap-3 justify-center rounded-2xl text-[17px] font-medium"
              >
                <PlayIcon size={15} />
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
