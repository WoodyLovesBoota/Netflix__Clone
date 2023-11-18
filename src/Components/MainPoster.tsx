import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";

const MainPoster = ({ data }: { data: IGetMoviesResult | undefined }) => {
  const navigate = useNavigate();
  const onBoxClicked = (
    movieId: number | undefined,
    title: string | undefined
  ) => {
    navigate(`${title}/${movieId}`);
  };
  return (
    <Banner bgPhoto={makeImagePath(data?.results[0].poster_path || "")}>
      <Title>{data?.results[0].title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
      <Button
        onClick={() => {
          onBoxClicked(data?.results[0].id, "movies/Now%20Playing");
        }}
      >
        자세히 보기
      </Button>
    </Banner>
  );
};

export default MainPoster;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 62.5vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  padding-bottom: 250px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Button = styled.div`
  width: 200px;
  height: 70px;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border-radius: 24px;
  margin-top: 50px;
  cursor: pointer;
  font-weight: 500;
`;
