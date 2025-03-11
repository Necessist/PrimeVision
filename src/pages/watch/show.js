import { ArrowIcon, PlayIcon, ShareIcon } from "$dev/components/svgIcons";
import Row from "$dev/components/ui/Row";
import ShowEpi from "$dev/components/ui/ShowEpi";
import axios from "axios";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Show = () => {
  const router = useRouter();
  const { id } = router.query;

  const containerRef = useRef(null);

  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=680c99274ddab12ffac27271d9445d45&append_to_response=credits,recommendations`
        );
        const data = response.data;
        setShowData(data); // No need to access `data.data[0]`, just use `data`
      } catch (error) {
        console.error("Error fetching show data:", error);
      }
    };

    if (id) {
      fetchShowData();
    }
  }, [id]);

  // Check if showData is available and has backdrop_path
  if (!showData) {
    return <div>Loading...</div>;
  }

  const handleLeftClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300; // (300px)
    }
  };

  const handleRightClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300; // (300px)
    }
  };

  return (
    <>
      <NextSeo
        title={`Watch - ${showData.title || showData.name} | PrimeVision`}
        description={`Enjoy ad-free streaming in high quality! Watch ${
          showData.title || showData.name
        } seamlessly, anytime, anywhere. Sit back, relax, and dive into an uninterrupted entertainment experience!`}
        canonical="https://prime-vision.vercel.app"
        openGraph={{
          title: `Watch - ${showData.title || showData.name} | PrimeVision`,
          description: `Enjoy ad-free streaming in high quality! Watch ${
            showData.title || showData.name
          } seamlessly, anytime, anywhere. Sit back, relax, and dive into an uninterrupted entertainment experience!`,
          url: ``,
          images: [
            {
              url: `https://image.tmdb.org/t/p/w300${showData.backdrop_path}`,
              width: 1200,
              height: 630,
              alt: "Search Image",
            },
          ],
        }}
      />
      <div>
        {/** Seasons & episodes + Player*/}
        <div className="w-full">
          <ShowEpi showData={showData} id={id} />
        </div>

        {/** Info */}
        {/** Info */}
        <div className="mt-6 px-3">
          <h1 className="text-2xl font-bold">
            {showData.title || showData.name}
          </h1>
          <label className="text-[12px]">
            ⭐{" "}
            <span className="opacity-65">
              {showData.vote_average.toFixed(1)}
            </span>
          </label>
          <p className="text-[14px] opacity-65 line-clamp-5 mt-1">
            {showData.overview}
          </p>
        </div>

        {/** Cast */}
        {showData.credits && (
          <div className="mt-[36px]">
            <div className="flex items-center justify-between px-2 h-[40px]">
              <h1 className="text-[24px] font-medium">Cast</h1>
              {/* <div className="flex items-center gap-3 h-[40px]">
                <button
                  onClick={handleLeftClick}
                  className="w-[40px] cursor-pointer h-[40px] rotate-90 flex items-center justify-center rounded-full border border-stone-800"
                >
                  <ArrowIcon size={20} />
                </button>
                <button
                  onClick={handleRightClick}
                  className="w-[40px] cursor-pointer scroll-smooth h-[40px] rotate-270 flex items-center justify-center rounded-full border border-stone-800"
                >
                  <ArrowIcon size={20} />
                </button>
              </div> */}
            </div>
            {showData.credits.cast && (
              <div
                ref={containerRef}
                className="mt-3 flex gap-3 overflow-x-auto no-scrollbar whitespace-nowrap overflow-hidden"
              >
                {showData.credits.cast
                  .filter((item) => item.profile_path) // Exclude items with null profile_path
                  .map((item, index) => (
                    <Link href={``} key={index}>
                      <div className="relative w-[150px] h-auto rounded-2xl flex flex-col gap-3">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                          className="w-full h-auto object-cover rounded-2xl"
                          alt={item.name || item.original_name}
                          style={{ aspectRatio: 500 / 750 }}
                        />
                        <div className="px-2">
                          <h1 className="font-bold truncate w-[147px]">
                            {item.name || item.original_name}
                          </h1>
                          <div className="flex items-center text-[12px]">
                            <p className="flex items-center gap-2 truncate">
                              Ch: {item.character}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}

        {/** Recommended */}
        {showData.recommendations && (
          <div className="mt-12">
            <Row
              title={"You might like"}
              rowData={showData.recommendations}
              type={"tv"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Show;
