import styled from "styled-components";
import { IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { screenState } from "../atom";
import TvDesc from "./TvDesc";

const TvRow = ({ data, title }: { data: IGetTvsResult | undefined; title: string }) => {
  const [back, isBack] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [screen, setScreen] = useRecoilState(screenState);

  const offset = screen === 0 ? 2 : screen === 1 ? 4 : 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
    isBack(1);
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
    isBack(-1);
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClicked = (tvId: number, title: string) => {
    navigate(`${title}/${tvId}`);
  };

  return (
    <>
      <Wrapper>
        <h2>{title}</h2>
        <AnimatePresence custom={back} initial={false} onExitComplete={toggleLeaving}>
          <SlideButton onClick={decreaseIndex} whileHover={{ opacity: 0.6 }} left={true}>
            {"<"}
          </SlideButton>
          <Row
            custom={back}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={index}
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + "" + title}
                  key={movie.id}
                  onClick={() => onBoxClicked(movie.id, title)}
                  variants={boxVariants}
                  initial={"normal"}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w300" || "")}
                  whileHover={"hover"}
                  transition={{ type: "tween" }}
                >
                  <Info>
                    <h4>{movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <SlideButton onClick={increaseIndex} whileHover={{ opacity: 0.6 }} left={false}>
            {">"}
          </SlideButton>
        </AnimatePresence>
      </Wrapper>
      <TvDesc data={data} title={title} />
    </>
  );
};

export default TvRow;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: calc(20px + (100vw - 100px) / 6 * 9 / 16);
  position: relative;

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: lightgray;
  }
  @media screen and (max-width: 1200px) {
    margin-bottom: calc(20px + (100vw - 60px) / 4 * 9 / 16);
  }
  @media screen and (max-width: 800px) {
    margin-bottom: calc(20px + (100vw - 32px) / 2 * 9 / 16);
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
`;

const SlideButton = styled(motion.div)<{ left: boolean }>`
  z-index: 99;
  background: linear-gradient(
    to ${(props) => (props.left ? "left" : "right")},
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 0;
  font-size: 2.25rem;
  font-weight: 800;
  height: calc((100vw - 120px) / 6 * 9 / 16);
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: ${(props) => (props.left ? 100 : 0)};
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    height: calc((100vw - 60px) / 4 * 9 / 16);
  }
  @media screen and (max-width: 800px) {
    height: calc((100vw - 32px) / 2 * 9 / 16);
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  top: 30px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: calc((100vw - 120px) / 6 * 9 / 16);
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  position: relative;
  border-radius: 3px;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    height: calc((100vw - 60px) / 4 * 9 / 16);
  }
  @media screen and (max-width: 800px) {
    height: calc((100vw - 32px) / 2 * 9 / 16);
  }
`;

const rowVariants = {
  hidden: (custom: number) => ({
    x: (window.outerWidth + 5) * custom,
  }),

  visible: { x: 0, y: -0 },

  exit: (custom: number) => ({
    x: (-window.outerWidth - 5) * custom,
  }),
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    zIndex: 99,
    scale: 1,
    y: -20,
    borderRadius: 10,
    transition: { duration: 0.5, type: "spring" },
  },
};
