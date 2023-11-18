import styled from "styled-components";
import { IGenreResult, getTvGenre, IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const TvDesc = ({ data, title }: { data: IGetTvsResult | undefined; title: string }) => {
  const navigate = useNavigate();
  const bigTvMatch: PathMatch<string> | null = useMatch("tv/:title/:tvId");

  const { data: tvGenre, isLoading: isLoadingGenreMovie } = useQuery<IGenreResult>(
    ["genre", "tvGenre"],
    getTvGenre
  );

  const onOverlayClick = () => {
    navigate("/tv");
  };

  const clickedMovie =
    bigTvMatch?.params.tvId && data?.results.find((tv) => tv.id === Number(bigTvMatch.params.tvId));

  return (
    <AnimatePresence>
      {!isLoadingGenreMovie && bigTvMatch && bigTvMatch.params.title === title && (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          ></Overlay>
          <BigMovie layoutId={bigTvMatch.params.tvId + "" + title}>
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

                <BigTitle>{clickedMovie.name}</BigTitle>
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
                    <Rating>평점: {Math.floor(clickedMovie.vote_average * 100) / 100}</Rating>
                    <Genre>
                      장르:
                      {clickedMovie.genre_ids.map((id) =>
                        tvGenre?.genres.map((genre) =>
                          genre.id === id ? <span> {genre.name} </span> : null
                        )
                      )}
                    </Genre>
                    <Date>방영일: {clickedMovie.first_air_date}</Date>
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

export default TvDesc;

const DescContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Column = styled.div`
  &:first-child {
    width: 70%;
  }
  &:last-child {
    width: 30%;
  }
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 35vw;
  height: 90vh;
  top: 5vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  overflow: hidden;
  border-radius: 15px;
  z-index: 100;
`;

const BigCover = styled.div`
  width: 100%;
  height: 21.6vw;
  background-position: center center;
  background-size: cover;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 36px;
  position: relative;
  top: -70px;
  padding-left: 40px;
  font-weight: 400;
`;

const Rating = styled.p`
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 20px;
`;

const Date = styled.p`
  padding-right: 40px;
  color: ${(props) => props.theme.white.darker};
  padding-right: 40px;
`;

const Poster = styled.img`
  position: absolute;
  top: 100px;
  left: 40px;
  width: 150px;
  border-radius: 20px;
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
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 98;
`;
const StarRateWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0;
  span {
    display: inline-block;
    margin-right: 3px;
  }
`;
