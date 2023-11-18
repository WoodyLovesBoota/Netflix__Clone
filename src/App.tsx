import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";

const App = () => {
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
