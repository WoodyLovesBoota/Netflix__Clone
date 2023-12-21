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
          <Rows>
            <Slider>
              <TvRow data={trendTv} title="Trending" />
            </Slider>
            <Slider>
              <TvRow data={topRatedTv} title="Top Rated" />
            </Slider>
            <Slider>
              <TvRow data={popularTv} title="Popular" />
            </Slider>
          </Rows>
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
