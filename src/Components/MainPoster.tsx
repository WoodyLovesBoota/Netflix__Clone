import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";

const MainPoster = ({ data }: { data: IGetMoviesResult | undefined }) => {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number | undefined, title: string | undefined) => {
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
        상세정보
      </Button>
    </Banner>
  );
};

export default MainPoster;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 56.25vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.8)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  padding-bottom: 250px;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Overview = styled.p`
  font-size: 18px;
  width: 50%;
  font-weight: 400;
`;

const Button = styled.div`
  width: 150px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
  font-weight: 400;
  border-radius: 5px;
`;
