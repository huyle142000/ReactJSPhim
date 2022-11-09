import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import BannerComponent from "./components/BannerComponent/BannerComponent";
import BlogComponent from "./components/BlogComponent/BlogComponent";
import Admin from "./pages/Admin/Admin";
import AddMovie from "./pages/Admin/MovieAdmin/AddMovie/AddMovie";
import EditMovie from "./pages/Admin/MovieAdmin/EditMovie/EditMovie";
import MovieAdmin from "./pages/Admin/MovieAdmin/MovieAdmin";
import ShowtimeAdmin from "./pages/Admin/MovieAdmin/ShowtimeAdmin/ShowtimeAdmin";

import UserAdmin from "./pages/Admin/UserAdmin/UserAdmin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AdminTemplate from "./Templates/AdminTemplate/AdminTemplate";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import ModalFilm from "./Templates/ModalFilm/ModalFilm";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Router history={history}>
        <ModalFilm />
        <Switch>
          <HomeTemplate exact path="/home" Component={Home}></HomeTemplate>

          {/* default url khi push nhánh nhớ đưa file vào Home*/}
          <HomeTemplate exact path="/" Component={Home}></HomeTemplate>
          <HomeTemplate exact path="/login" Component={Login}></HomeTemplate>

          {/* admin */}
          <AdminTemplate exact path="/admin" Component={Admin} />
          <AdminTemplate exact path="/admin/useradmin" Component={UserAdmin} />
          <AdminTemplate
            exact
            path="/admin/movieadmin"
            Component={MovieAdmin}
          />
          <AdminTemplate
            exact
            path="/admin/movieadmin/showtimeadmin/:maPhim"
            Component={ShowtimeAdmin}
          />
          <AdminTemplate
            exact
            path="/admin/movieadmin/addmovie"
            Component={AddMovie}
          />
          <AdminTemplate
            exact
            path="/admin/movieadmin/editmovie/:maPhim"
            Component={EditMovie}
          />

          {/*  */}
        </Switch>
      </Router>
    </BrowserRouter>
  );
}

export default App;
