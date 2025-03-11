import axios from "axios";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_KEY = "b97f6136017b4624c68fad65c7443047";

const Explore = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [showGenres, setShowGenres] = useState([]);

  const fetchMovieGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      setMovieGenres(response.data.genres || []);
    } catch (error) {
      console.error("Error fetching movie genres:", error);
    }
  };

  const fetchShowGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      setShowGenres(response.data.genres || []);
    } catch (error) {
      console.error("Error fetching show genres:", error);
    }
  };

  useEffect(() => {
    fetchMovieGenres();
    fetchShowGenres();
  }, []);

  const sections = [
    { label: "Movies based on genres", data: movieGenres, href: "movie" },
    { label: "Shows based on genres", data: showGenres, href: "show" },
  ];

  const borderColors = [
    "border-red-500",
    "border-blue-500",
    "border-green-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
    "border-orange-500",
    "border-indigo-500",
    "border-teal-500",
  ];

  return (
    <>
    <NextSeo
        title="Explore | PrimeVision"
        description="Discover the best movies and TV shows on our Explore page! Find your next favorite film or binge-worthy series, all in one place."
        canonical="https://prime-vision.vercel.app"
        openGraph={{
          title: "Explore | PrimeVision",
          description: "Discover the best movies and TV shows on our Explore page! Find your next favorite film or binge-worthy series, all in one place.",
          url: "https://prime-vision.vercel.app/explore",
          images: [
            {
              url: "https://yourwebsite.com/homepage-image.jpg",
              width: 1200,
              height: 630,
              alt: "Homepage Image",
            },
          ],
        }}
      />

    <div className="flex flex-col gap-8 px-3">
      {sections.map((section, index) => (
        <div key={index}>
          <h1 className="text-xl font-bold">{section.label}</h1>
          <div className="mt-3 overflow-auto no-scrollbar">
            <div className="grid grid-rows-3 grid-cols-7 gap-3 min-w-max">
              {section.data.map((genre, index) => (
                <Link
                  href={`/genre/${section.href}?id=${genre.id}&title=${genre.name}`}
                  key={genre.id}
                >
                  <div
                    className={`h-[44px] w-[150px] flex items-center justify-center 
                    text-[14px] font-bold border rounded-2xl
                    ${
                      borderColors[
                        Math.floor(Math.random() * borderColors.length)
                      ]
                    }`}
                  >
                    {genre.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Explore;
