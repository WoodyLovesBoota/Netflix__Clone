import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
import { useRecoilState } from "recoil";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { screenState } from "./atom";

const App = () => {
  const mobileMatch = useMediaQuery("(max-width:800px)");
  const midMatch = useMediaQuery("(max-width:1200px)");
  const [screen, setScreen] = useRecoilState(screenState);

  useEffect(() => {
    if (!mobileMatch && !midMatch) setScreen(2);
    else if (!mobileMatch && midMatch) setScreen(1);
    else if (mobileMatch) setScreen(0);
  }, [mobileMatch, midMatch]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:title/:id" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="/search/:type/:id" element={<Search />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="movies/:title/:id" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
