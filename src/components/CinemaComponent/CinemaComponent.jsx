import "./css/CinemaComponent.css";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  getAllCinema,
  getCinemaCluster,
  getCinemaRelease,
} from "../../redux/actions/CinemaAction";
import _ from "lodash";
import moment from "moment";
import { PLAY_LOADING } from "../../redux/type/SpinnerType";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import "./../DetailComponent/details.css";
let currentDate = moment(new Date()).format("DDMMYY");

const CinemaComponent = () => {
  const dispatch = useDispatch();
  const { currentCinema, arrCinemaRelease, arrCinemaCluster } = useSelector(
    (state) => state.CinemaReducer
  );
  const [active, setActive] = useState({
    logoSystem: 0,
    logoCluster: 0,
  });
  const [code, setCode] = useState({
    cinemaBasicCode: currentCinema[0]?.maHeThongRap,
    imgLogo: currentCinema[0]?.logo,
    cinemaReleaseCode: arrCinemaCluster[0]?.maCumRap,
  });
  const { renderCalender, release, show, setShow } = Calendar();

  useEffect(() => {
    dispatch(getAllCinema());
  }, []);
  // call khi đổi giá trị
  useEffect(() => {
    dispatch(getCinemaCluster(code.cinemaBasicCode));
    dispatch(getCinemaRelease(code.cinemaBasicCode));
  }, [code.cinemaBasicCode]);
  //khi thay đổi rạp bằng setcode trong renderSystemCinema thì cho mặc định mã cụm rạp là thằng ban đầu
  useEffect(() => {
    setCode({
      ...code,
      cinemaReleaseCode: arrCinemaCluster[0]?.maCumRap,
    });
  }, [arrCinemaCluster]);
  useEffect(() => {
    let timer1 = setTimeout(() => {
      return setShow(false);
    }, 800);

    return () => {
      clearTimeout(timer1);
    };
  }, [show]);

  const renderSystemCinema = () => {
    return currentCinema?.map((cine, i) => {
      return (
        <div
          key={i}
          className={
            active.logoSystem === i
              ? "logo_system cinema_logo-active col"
              : "logo_system col"
          }
          onClick={() => {
            setActive({ ...active, logoSystem: i, logoCluster: 0 });
            setCode({
              ...code,
              cinemaBasicCode: cine.maHeThongRap,
              imgLogo: cine.logo,
            });
            setShow(true);
          }}
        >
          <img src={cine.logo} alt="" />
        </div>
      );
    });
  };
  const renderClusterCinema = () => {
    return arrCinemaCluster?.map((cluster, i) => {
      return (
        <div key={i} className="col-3 col-sm-12">
          <div
            onClick={() => {
              setActive({ ...active, logoCluster: i });
              setCode({
                ...code,
                cinemaReleaseCode: cluster.maCumRap,
              });
              setShow(true);
            }}
            className={
              active.logoCluster === i
                ? "logo_system cinema_logo-active row py-2"
                : "logo_system row py-2"
            }
          >
            <div className="col-sm-12 text-center">
              <div>
                <img src={code.imgLogo} alt="" />
              </div>
            </div>
            <div className="col-sm-12 cinema_title-cluster">
              <h5 className="cinema_title ">{cluster.tenCumRap}</h5>
              <h6 className="cinema_title ">{cluster.diaChi}</h6>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCinemaRelease = () => {
    let filterArr = arrCinemaRelease?.map((cinema) => {
      return cinema.lstCumRap.filter((cumRap) => {
        return code.cinemaReleaseCode === cumRap.maCumRap;
      });
    });
    filterArr = _.flattenDepth(filterArr, 1);
    let releaseFilm = [];
    filterArr?.map((cinema) => {
      return cinema.danhSachPhim.map((movies, i) => {
        return movies.lstLichChieuTheoPhim.map((movie, i) => {
          let convertDate = moment(movie.ngayChieuGioChieu);
          if (convertDate.format("DDMMYY") === release) {
            releaseFilm.push(movies);
          }
        });
      });
    });
    if (releaseFilm.length !== 0) {
      releaseFilm = _.uniq(releaseFilm);
      return releaseFilm?.map((movies, i) => {
        return (
          <Fragment key={i}>
            <div className="col">
              <div className="row">
                <div className="col-3 text-center">
                  <img
                    src={movies.hinhAnh}
                    style={{ height: "100%", width: "100%" }}
                    alt=""
                  />
                </div>
                <div className="col-9 text-left">
                  <h3 className="cinema_title-release">
                    {movies.tenPhim}
                    {movies.hot && (
                      <span>
                        <div className="cinema_gif d-inline-block" alt="" />
                      </span>
                    )}
                  </h3>
                  <div className="mt-3">
                    <div className="cinema_title-release-date mb-2">
                      Suất chiếu:
                    </div>
                    <div>
                      {movies.lstLichChieuTheoPhim.map((movie, i) => {
                        let convertDate = moment(movie.ngayChieuGioChieu);
                        if (convertDate.format("DDMMYY") === release) {
                          return (
                            <button
                              key={i}
                              className="btn btn_primary m-1"
                              onClick={() => {
                                history.push("/booking", { path: movie });
                              }}
                            >
                              {convertDate.format("hh:mm")}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      });
    } else {
      return (
        <div className="cinema_list-film">
          <h3>
            Oops!! Không có phim nào chiếu ngày này rồi, bạn chọn ngày khác nhé
            !!
          </h3>
        </div>
      );
    }
  };

  return (
    <div className="cinema py-5 text-center mt-5">
      <h2 className="cinema_header">ĐẶT VÉ PHIM ONLINE</h2>
      <div className="row cinema_header-logo mt-5">{renderSystemCinema()}</div>
      <div className="row cinema__content mt-3">
        <div className="col-12 col-sm-3 cinema__content_left">
          <div className="row cinema_ClusterCinema">
            {renderClusterCinema()}
          </div>
        </div>
        <div className="col-12 col-sm-9">
          <div className="cinema_calender-wrap-top">{renderCalender()}</div>
          <div className="cinema_calender-wrap-bot height-100 mt-3">
            <div className="row flex-column position-relative">
              {show && (
                <div className="spinner">
                  <div className="spinner-img"></div>
                </div>
              )}
              {renderCinemaRelease()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CinemaComponent;
