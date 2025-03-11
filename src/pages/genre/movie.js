import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { NextSeo } from "next-seo";

const API_KEY = "b97f6136017b4624c68fad65c7443047";

const MovieGenrePage = () => {
  const router = useRouter();
  const { id, title } = router.query;
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Fetch Movies Function
  const fetchMovies = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=en-US&page=${pageNum}`
      );

      if (response.data.results.length === 0) {
        setHasMore(false); // No more pages to load
      } else {
        setMovies((prev) => [...prev, ...response.data.results]); // Append new data
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Load first page when the component mounts or genre ID changes
  useEffect(() => {
    if (id) {
      setMovies([]); // Reset when genre changes
      setPage(1);
      setHasMore(true);
      fetchMovies(1);
    }
  }, [id]);

  // Infinite Scroll Observer
  const lastElementRef = useCallback(
    (node) => {
      if (!hasMore) return; // Stop observing if no more pages

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Fetch new page when "page" state updates
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <>
      <NextSeo
        title={`${title} - Explore | PrimeVision`}
        description={`Dive into the world of ${title}! Explore a collection of the best ${title} movies, from timeless classics to the latest releases. Experience stunning visuals and captivating stories for all ages!`}
        canonical="https://prime-vision.vercel.app"
        openGraph={{
          title: `${title} - Explore | PrimeVision`,
          description: `Dive into the world of ${title}! Explore a collection of the best ${title} movies, from timeless classics to the latest releases. Experience stunning visuals and captivating stories for all ages!`,
          url: `https://prime-vision.vercel.app/genre/movie?id=${id}&title=${title}`,
          images: [
            {
              url: "https://yourwebsite.com/homepage-image.jpg",
              width: 1200,
              height: 630,
              alt: "Search Image",
            },
          ],
        }}
      />
      <div className="px-2">
        <h1 className="text-2xl font-bold mb-6">Movies - {title}</h1>
        <div className="flex gap-6 flex-wrap justify-around">
          {movies.map((item, index) => (
            <Link href={`/watch/movie?id=${item.id}`} key={index}>
              <div
                ref={index === movies.length - 1 ? lastElementRef : null} // Observe last item
                className="relative w-[150px] h-auto rounded-2xl flex flex-col gap-3"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-full h-auto object-cover rounded-2xl"
                  alt={item.title}
                  style={{ aspectRatio: 500 / 750 }}
                />
                <div className="px-2">
                  <h1 className="font-bold truncate w-[147px]">{item.title}</h1>
                  <div className="flex items-center justify-between text-[12px]">
                    <p className="flex items-center gap-2">
                      <span className="opacity-65">
                        {item.release_date
                          ? new Date(item.release_date).getFullYear()
                          : "N/A"}
                      </span>
                      <span className="text-[17px]">•</span>
                      <span className="opacity-65">
                        ⭐{" "}
                        {item.vote_average
                          ? item.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                    </p>
                    <span className="border border-white px-1 py-0.5 opacity-65 rounded-[5px]">
                      Movie
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && <p className="text-center my-4 text-lg">Loading more...</p>}
      </div>
    </>
  );
};

export default MovieGenrePage;
