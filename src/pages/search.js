import { ArrowIcon, SearchIcon } from "$dev/components/svgIcons";
import Link from "next/link";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { NextSeo } from "next-seo";

const API_KEY = "b97f6136017b4624c68fad65c7443047";

const SearchPage = () => {
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("All");
  const [typeSearch, setTypeSearch] = useState("multi");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const dropDownItems = [
    { label: "All", searchType: "multi" },
    { label: "Movies", searchType: "movie" },
    { label: "Shows", searchType: "tv" },
  ].filter((item) => item.label !== selected && item.searchType !== typeSearch);

  const toggleDropDown = () => setDropDown((prev) => !prev);

  const handleSelect = (label, searchType) => {
    setSelected(label);
    setTypeSearch(searchType);
    setDropDown(false);
  };

  // Debounced search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = debounce(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/${typeSearch}?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    }, 300);

    fetchResults();

    return () => fetchResults.cancel();
  }, [query, typeSearch]); // <- Make sure to add `typeSearch` dependency

  return (
    <>
      <NextSeo
        title="Search | PrimeVision"
        description="Looking for a specific movie or show? Use our powerful search feature to find your favorite titles instantly. Explore a vast collection of films and series, all at your fingertips!"
        canonical="https://prime-vision.vercel.app"
        openGraph={{
          title: "Search | PrimeVision",
          description:
            "Looking for a specific movie or show? Use our powerful search feature to find your favorite titles instantly. Explore a vast collection of films and series, all at your fingertips!",
          url: "https://prime-vision.vercel.app/search",
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
      <div>
        {/** Search box */}
        <div className="fixed top-[63px] left-0 right-0 z-50 bg-stone-800/30 backdrop-blur-sm">
          <div className="w-full h-full border-b border-white/70 flex flex-col gap-2 px-2 py-2 overflow-hidden">
            <div className="w-full h-[40px] bg-stone-800 rounded-2xl flex px-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none focus:outline-none border-none w-[380px] h-full"
              />
              <button className="ml-[20px] h-[40px] rounded-r-2xl flex items-center justify-center">
                <SearchIcon size={19} />
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={toggleDropDown}
                className="w-full px-3 h-[40px] flex items-center justify-center gap-2 bg-stone-800 rounded-2xl"
              >
                {selected}
                <i className={dropDown ? "rotate-180" : ""}>
                  <ArrowIcon size={16} />
                </i>
              </button>

              {/** DropDown */}
              {dropDown && (
                <div className="absolute top-[100px] left-0 right-0 w-full p-3 bg-stone-800 rounded-2xl flex flex-col space-y-2">
                  {dropDownItems.map((item, index) => (
                    <button
                      onClick={() => handleSelect(item.label, item.searchType)}
                      key={index}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/** Search Result */}
        <div className="flex flex-wrap justify-around gap-6 mt-50 px-2">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : query.trim() === "" ? (
            <p className="text-white text-center w-full">Search something</p>
          ) : results.length === 0 ? (
            <p className="text-white text-center w-full">No results found</p>
          ) : (
            results.map((item, index) => (
              <Link
                href={`/${
                  item.media_type === "tv"
                    ? `watch/show?id=${item.id}&s=1&ep=1`
                    : `watch/movie?id=${item.id}`
                }`}
                key={index}
              >
                <div className="relative w-[150px] h-auto rounded-2xl flex flex-col gap-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    className="w-full h-auto object-cover rounded-2xl"
                    alt={item.name || item.title}
                    style={{ aspectRatio: 500 / 750 }}
                  />
                  <div className="px-2">
                    <h1 className="font-bold truncate w-[147px]">
                      {item.title || item.name}
                    </h1>
                    <div className="flex items-center justify-between text-[12px]">
                      <p className="flex items-center gap-2">
                        <span className="opacity-65">
                          {item.release_date
                            ? new Date(item.release_date).getFullYear()
                            : item.first_air_date
                            ? new Date(item.first_air_date).getFullYear()
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
                        {item.media_type || selected == "Shows"
                          ? "TV"
                          : "Movie"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
