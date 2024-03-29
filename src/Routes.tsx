import {
  Routes as Router,
  Route,
} from "react-router-dom";

import { HomeContainer } from "./components/layout/HomeContainer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";


export const Routes = () => {

  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:chainId/:daoId" element={<Blog/>} />
        <Route path="/content/:chainId/:daoId/:contentId" element={<BlogDetail/>} />


      </Route>
    </Router>
  );
};
