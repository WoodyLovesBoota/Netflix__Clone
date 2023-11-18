import { useLocation, useNavigate } from "react-router-dom";
import { getSearchMovieResult, getSearchTvResult, IGetMoviesResult, IGetTvsResult } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";
import SearchDesc from "../Components/SearchDesc";
import SearchDescTv from "../Components/SearchDescTv";
import { useState } from "react";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();
  const [isMovieClicked, setIsMovieClicked] = useState(false);

  const onBoxClicked = (movieId: number, title: string) => {
    navigate(`${title}/${movieId}?keyword=${keyword}`);
  };

  const { data: movie, isLoading: movieLoading } = useQuery<IGetMoviesResult>(
    ["searchMovie", keyword],
    () => getSearchMovieResult(keyword || "")
  );

  const { data: tv, isLoading: tvLoading } = useQuery<IGetTvsResult>(["searchTv", keyword], () =>
    getSearchTvResult(keyword || "")
  );

  const [movieResult, tvResult] = [movie?.results, tv?.results];

  return (
    <>
      <Wrapper>
        <Container>
          <Title>Movies</Title>
          <Row>
            {movieResult?.map((movie) => (
              <Box
                onClick={() => {
                  setIsMovieClicked(true);
                  onBoxClicked(movie.id, "movie");
                }}
                whileHover={"hover"}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500" || "")}
                key={movie.id}
                layoutId={movie.id + "" + "movie"}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          </Row>
        </Container>
        <Container>
          <Title>TV Shows</Title>
          <Row>
            {tvResult?.map((tv) => (
              <Box
                onClick={() => {
                  setIsMovieClicked(false);
                  onBoxClicked(tv.id, "tv");
                }}
                whileHover={"hover"}
                bgPhoto={makeImagePath(tv.backdrop_path, "w500" || "")}
                key={tv.id}
                layoutId={tv.id + "" + "tv"}
              >
                <Info variants={infoVariants}>
                  <h4>{tv.name}</h4>
                </Info>
              </Box>
            ))}
          </Row>
        </Container>
      </Wrapper>
      {isMovieClicked ? (
        <SearchDesc data={movie} title={"movie"} keyword={String(keyword)} />
      ) : (
        <SearchDescTv data={tv} title={"tv"} keyword={String(keyword)} />
      )}
    </>
  );
};

export default Search;

const Wrapper = styled.div`
  padding: 40px;
`;

const Container = styled.div`
  margin-top: 100px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
`;
const Info = styled(motion.div)`
  padding: 10px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  background-color: gray;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  position: relative;
`;

const infoVariants = {
  hover: { opacity: 1, transition: { delay: 0.1, duration: 0.2, type: "tween" } },
};
