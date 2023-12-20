import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetTvsResult, getTopRatedTvs, getTrendingTvs, getPopularTvs } from "../api";
import TvRow from "../Components/TvRow";
import MainTvPoster from "../Components/MainTvPoster";

const Tv = () => {
  const { data: trendTv, isLoading: trendTvLoading } = useQuery<IGetTvsResult>(
    ["tvs", "trendTv"],
    getTrendingTvs
  );

  const { data: topRatedTv, isLoading: topRatedTvLoading } = useQuery<IGetTvsResult>(
    ["topTvs", "topRatedTv"],
    getTopRatedTvs
  );

  const { data: popularTv, isLoading: popularTvLoading } = useQuery<IGetTvsResult>(
    ["popTvs", "popularTv"],
    getPopularTvs
  );

  return (
    <Wrapper>
      {trendTvLoading || topRatedTvLoading || popularTvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainTvPoster data={trendTv} />
          <Slider>
            <TvRow data={trendTv} title="Trending" />
          </Slider>
          <Slider>
            <TvRow data={topRatedTv} title="Top Rated" />
          </Slider>
          <Slider>
            <TvRow data={popularTv} title="Popular" />
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;

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

const Slider = styled.div`
  margin-top: -50px;
  position: relative;
  padding-left: 60px;
`;
