import styled from "styled-components";
import { IGenreResult, IGetMoviesResult, getMovieGenre } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const MovieDesc = ({ data, title }: { data: IGetMoviesResult | undefined; title: string }) => {
  const navigate = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:title/:movieId");

  const { data: movieGenre, isLoading: isLoadingGenreMovie } = useQuery<IGenreResult>(
    ["genre", "moviegenre"],
    getMovieGenre
  );

  const onOverlayClick = () => {
    navigate("/");
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === Number(bigMovieMatch.params.movieId));
  return (
    <AnimatePresence>
      {!isLoadingGenreMovie && bigMovieMatch && bigMovieMatch.params.title === title && (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></Overlay>
          <BigMovie layoutId={bigMovieMatch.params.movieId + "" + title}>
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <Poster src={`${makeImagePath(clickedMovie.poster_path, "w200")}`} />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <DescContainer>
                  <Column>
                    <BigOverview>
                      {clickedMovie.overview.length > 500
                        ? clickedMovie.overview.slice(0, 400) + "..."
                        : clickedMovie.overview}
                    </BigOverview>
                  </Column>
                  <Column>
                    <StarRateWrap>
                      {["one", "two", "three", "four", "five"].map((count, index) => {
                        let rate = Math.floor((clickedMovie.vote_average * 10) / 2);
                        let list = [];
                        while (rate > 0) {
                          if (rate >= 10) {
                            list.push(14);
                            rate -= 10;
                          } else {
                            list.push((14 * rate) / 10);
                            rate = 0;
                          }
                        }
                        return (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 14 13"
                              fill="#cacaca"
                            >
                              <clipPath id={`${count}StarClip`}>
                                <rect width={`${list[index]}`} height="20" />
                              </clipPath>
                              <path
                                id={`${count}Star`}
                                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                                transform="translate(-2 -2)"
                              />
                              <use
                                clipPath={`url(#${count}StarClip)`}
                                href={`#${count}Star`}
                                fill="#ffba08"
                              />
                            </svg>
                          </span>
                        );
                      })}
                    </StarRateWrap>
                    <Rating>평점: {clickedMovie.vote_average}</Rating>
                    <Genre>
                      장르:
                      {clickedMovie.genre_ids.map((id) =>
                        movieGenre?.genres.map((genre) =>
                          genre.id === id ? <span> {genre.name} </span> : null
                        )
                      )}
                    </Genre>
                    <Date>방영일: {clickedMovie.release_date}</Date>
                  </Column>
                </DescContainer>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieDesc;

const DescContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 6px;
  font-size: 14px;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  &:first-child {
    width: 70%;
  }
  &:last-child {
    width: 30%;
  }
  @media screen and (max-width: 800px) {
    &:first-child {
      width: 100%;
    }
    &:last-child {
      width: 100%;
    }
  }
  border-radius: 6px;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 600px;
  height: 90vh;
  top: 5vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  z-index: 100;
  border-radius: 6px;
  @media screen and (max-width: 800px) {
    width: 80vw;
  }
`;

const BigCover = styled.div`
  width: 100%;
  height: 50%;
  background-position: center center;
  background-size: cover;
  border-radius: 6px;
`;

const Poster = styled.img`
  position: absolute;
  top: 100px;
  left: 40px;
  width: 150px;
  border-radius: 6px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 2.25rem;
  position: relative;
  top: -70px;
  padding-left: 40px;
  font-weight: 400;
`;

const Rating = styled.p`
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 10px;
  padding-right: 20px;
  @media screen and (max-width: 800px) {
    padding: 0 40px;
  }
`;

const Date = styled.p`
  padding-right: 40px;
  color: ${(props) => props.theme.white.darker};
  @media screen and (max-width: 800px) {
    padding: 0 40px;
    display: flex;
  }
`;

const BigOverview = styled.p`
  padding: 0 40px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.7;
`;

const Genre = styled.p`
  width: 100%;
  color: ${(props) => props.theme.white.darker};
  padding-right: 40px;
  margin-bottom: 20px;
  @media screen and (max-width: 800px) {
    padding: 0 40px;
    margin-bottom: 10px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 98;
`;
const StarRateWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  span {
    display: inline-block;
    margin-right: 3px;
  }
  @media screen and (max-width: 800px) {
    padding: 20px 40px;
  }
`;
