import Row from "$dev/components/ui/Row";
import SlideShow from "$dev/components/ui/SlideShow";
import axios from "axios";
import { useEffect, useState } from "react";

const myApi = `b97f6136017b4624c68fad65c7443047`;

const HomePage = () => {
  // get trending data
  const [trendingData, setTrendingData] = useState(null);

  const fetchTrending = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${myApi}`
      );
      const data = response.data;
      // console.log(data);
      setTrendingData(data);
    } catch (error) {
      console.error("Error fetching trendingData:", error);
    }
  };

  // get now playing data
  const [nowPlayingData, setNowPlayingData] = useState(null);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data);
      setNowPlayingData(data);
    } catch (error) {
      console.error("Error fetching nowPlayingData:", error);
    }
  };

  // popular now
  const [popularData, setPopularData] = useState(null);

  const fetchPopular = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data)
      setPopularData(data);
    } catch (error) {
      console.error("Error fetching popularData:", error);
    }
  };

  // top rated
  const [topRatedData, setTopRatedData] = useState(null);

  const fetchTopRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data)
      setTopRatedData(data);
    } catch (error) {
      console.error("Error fetching topRatedData:", error);
    }
  };

  // Airing Today TV
  const [airingTodayTV, setAiringTodayTV] = useState(null);
  const fetchAiringTodayTV = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data)
      setAiringTodayTV(data);
    } catch (error) {
      console.error("Error fetching topRatedData:", error);
    }
  };

  // popular tv
  const [popularTV, setPopularTV] = useState(null);
  const fetchPopularTV = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data)
      setPopularTV(data);
    } catch (error) {
      console.error("Error fetching popularTV:", error);
    }
  };

  // top rated tv
  const [topRatedTV, setTopRatedTV] = useState(null);

  const fetchTopRatedTV = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${myApi}&language=en-US&page=1`
      );
      const data = response.data;
      // console.log(data)
      setTopRatedTV(data);
    } catch (error) {
      console.error("Error fetching topRatedDataTV:", error);
    }
  };

  useEffect(() => {
    fetchTrending();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

    // tv
    fetchAiringTodayTV();
    fetchPopularTV();
    fetchTopRatedTV();
  }, []);

  const homeData = [
    { label: "Now Playing Movies", data: nowPlayingData, type: "movie" },
    { label: "Trending Movies", data: trendingData, type: "movie" },
    { label: "Top Rated Movies", data: topRatedData, type: "movie" },
    // { label: "Popular Today", data: popularData },
    { label: "Trending Shows", data: trendingData, type: "tv" },
    { label: "Airing Today Shows", data: airingTodayTV, type: "tv" },
    { label: "Popular TV Shows", data: popularTV, type: "tv" },
    { label: "Top Rated TV Shows", data: topRatedTV, type: "tv" },
  ];
  return (
    <>
      <div>
        <SlideShow slideData={popularData} />
        <div className="mt-8 flex flex-col space-y-8">
          {homeData.map((item, index) => (
            <div key={index}>
              <Row title={item.label} rowData={item.data} type={item.type} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
