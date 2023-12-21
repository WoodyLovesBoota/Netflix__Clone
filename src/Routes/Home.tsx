import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IGetMoviesResult,
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingTvs,
  getUpcomingMovies,
} from "../api";
import MovieRow from "../Components/MovieRow";
import MainPoster from "../Components/MainPoster";

const Home = () => {
  const { data: nowPlaying, isLoading } = useQuery<IGetMoviesResult>(
    ["nowPlayingMovies", "nowPlaying"],
    getMovies
  );

  const { data: popular, isLoading: popularLoading } = useQuery<IGetMoviesResult>(
    ["popularMovies", "popular"],
    getPopularMovies
  );

  const { data: topRated, isLoading: topRatedLoading } = useQuery<IGetMoviesResult>(
    ["topRatedMovies", "topRated"],
    getTopRatedMovies
  );

  const { data: upComing, isLoading: upcomingLoading } = useQuery<IGetMoviesResult>(
    ["upcomingMovies", "upComing"],
    getUpcomingMovies
  );

  const { data: trendTv, isLoading: trendTvLoading } = useQuery<IGetMoviesResult>(
    ["tvs", "trendTv"],
    getTrendingTvs
  );

  return (
    <Wrapper>
      {isLoading || popularLoading || topRatedLoading || upcomingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainPoster data={nowPlaying} />
          <Rows>
            <Slider>
              <MovieRow data={nowPlaying} title="Now Playing" />
            </Slider>
            <Slider>
              <MovieRow data={popular} title="Popular" />
            </Slider>
            <Slider>
              <MovieRow data={topRated} title="Top Rated" />
            </Slider>
            <Slider>
              <MovieRow data={upComing} title="Up Coming" />
            </Slider>
          </Rows>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

// Styled Components
const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rows = styled.div`
  margin-top: -50px;
  @media screen and (max-width: 1200px) {
    margin-top: -20px;
  }
  @media screen and (max-width: 800px) {
    margin-top: -0px;
  }
`;

const Slider = styled.div`
  position: relative;
  padding-left: 60px;
  @media screen and (max-width: 1200px) {
    padding-left: 30px;
  }
  @media screen and (max-width: 800px) {
    padding-left: 16px;
  }
`;
