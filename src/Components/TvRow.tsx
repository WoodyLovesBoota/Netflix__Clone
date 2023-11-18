import styled from "styled-components";
import { IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TvDesc from "./TvDesc";

const offset = 6;

const TvRow = ({ data, title }: { data: IGetTvsResult | undefined; title: string }) => {
  const [back, isBack] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

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
                  <Info variants={infoVariants}>
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
  justify-content: flex-start;
  margin-bottom: 330px;
  position: relative;

  h2 {
    position: absolute;
    font-size: 24px;
    font-weight: 500;
  }
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

const SlideButton = styled(motion.div)<{ left: boolean }>`
  z-index: 99;
  background: linear-gradient(
    to ${(props) => (props.left ? "left" : "right")},
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 0;
  font-size: 48px;
  font-weight: 800;
  height: 200px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${(props) => (props.left ? 100 : 0)};
  top: 50px;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  height: 200px;
  top: 50px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  font-size: 64px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariants = {
  hidden: (custom: number) => ({
    x: (window.outerWidth + 5) * custom,
  }),

  visible: { x: 0 },

  exit: (custom: number) => ({
    x: (-window.outerWidth - 5) * custom,
  }),
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    zIndex: 99,
    scale: 1.2,
    y: -50,
    borderRadius: 10,
    transition: { duration: 0.7, type: "spring" },
  },
};

const infoVariants = {
  hover: { opacity: 1, transition: { duration: 0.7, type: "spring" } },
};
