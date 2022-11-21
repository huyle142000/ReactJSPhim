import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import InfoUser from "./pages/Admin/UserAdmin/InfoUser/InfoUser";
import Profile from "./pages/Profile/Profile";
const Booking = React.lazy(() => import("./pages/Booking/Booking"));

const Detail = React.lazy(() => import("./components/DetailComponent/Detail"));
const AddMovie = React.lazy(() =>
  import("./pages/Admin/MovieAdmin/AddMovie/AddMovie")
);
const EditMovie = React.lazy(() =>
  import("./pages/Admin/MovieAdmin/EditMovie/EditMovie")
);
const MovieAdmin = React.lazy(() =>
  import("./pages/Admin/MovieAdmin/MovieAdmin")
);
const ShowtimeAdmin = React.lazy(() =>
  import("./pages/Admin/MovieAdmin/ShowtimeAdmin/ShowtimeAdmin")
);
const AddUser = React.lazy(() =>
  import("./pages/Admin/UserAdmin/AddUser/AddUser")
);
const EditUser = React.lazy(() =>
  import("./pages/Admin/UserAdmin/EditUser/EditUser")
);
const User = React.lazy(() => import("./pages/Admin/UserAdmin/User"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const AdminTemplate = React.lazy(() =>
  import("./Templates/AdminTemplate/AdminTemplate")
);
const HomeTemplate = React.lazy(() =>
  import("./Templates/HomeTemplate/HomeTemplate")
);
const ModalFilm = React.lazy(() => import("./Templates/ModalFilm/ModalFilm"));

export const history = createBrowserHistory();

function App() {
  const [isLight, setTheme] = useState(true);
  const { isPlay } = useSelector((state) => state.Spinner);
  return (
    <BrowserRouter>
      <Router history={history}>
        <React.Suspense
          fallback={
            <div className="spinner">
              <div className="spinner-img"></div>
            </div>
          }
        >
          {isPlay && (
            <div className="spinner">
              <div className="spinner-img"></div>
            </div>
          )}
          <div className="change_theme">
            {isLight && (
              <button
                className="btn"
                onClick={() => {
                  setTheme(!isLight);
                  document.querySelector("body").classList.add("dark")
                }}
              >
                <i className="fa-solid fa-moon"></i>
              </button>
            )}
            {!isLight && (
              <button
                className="btn"
                onClick={() => {
                  setTheme(!isLight);
                  document.querySelector("body").classList.remove("dark")
                }}
              >
                <i className="fa-solid fa-sun"></i>
              </button>
            )}
          </div>
          <ModalFilm />
          <Switch>
            <HomeTemplate exact path="/home" Component={Home}></HomeTemplate>

            {/* default url khi push nhánh nhớ đưa file vào Home*/}
            <HomeTemplate exact path="/" Component={Home}></HomeTemplate>
            <HomeTemplate exact path="/login" Component={Login}></HomeTemplate>
            {/* ticket */}
            <HomeTemplate
              exact
              path="/booking"
              Component={Booking}
            ></HomeTemplate>
            {/* HomeDetail */}
            <HomeTemplate
              exact
              path="/detail/:maPhim"
              Component={Detail}
            ></HomeTemplate>

            {/* admin */}
            <AdminTemplate exact path="/admin" Component={User} />
            <AdminTemplate exact path="/admin/useradmin" Component={User} />
            <AdminTemplate
              exact
              path="/admin/edituser/adduser"
              Component={AddUser}
            />
            <AdminTemplate
              exact
              path="/admin/edituser/:taiKhoan"
              Component={EditUser}
            />
            <AdminTemplate
              exact
              path="/admin/edituser/infouser/:taiKhoan"
              Component={InfoUser}
            />
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
            <HomeTemplate exact path="/profile" Component={Profile} />
          </Switch>
        </React.Suspense>
        <ToastContainer />
      </Router>
    </BrowserRouter>
  );
}

export default App;
