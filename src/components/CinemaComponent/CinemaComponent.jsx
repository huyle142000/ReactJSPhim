import "./CinemaComponent.css";
import React, { useState } from "react";
import "./lib/Calender";
import { calender } from "./lib/Calender";
import { useDispatch, useSelector } from "react-redux";
import CinemaModalComponent from "./CinemaModalComponent";
import {
  getAllCinema,
  cinemaModalAction,
  getCinemaClusters,
} from "../../redux/actions/CinemaAction";
import { useEffect } from "react";
import { OPEN_LIST_CINEMA_MODAL } from "../../redux/type/ModalType";
import { GET_LIST_CINEMA_CLUSTERS } from "../../redux/type/CinemaType";

export default function CinemaComponent() {
  const [activeCinemaIndex, setActiveCinemaIndex] = useState(0);
  const [activeDate, setActiveDate] = useState(0);

  const dispatch = useDispatch();

  const [cinemaInfo, setCinemaInfo] = useState({
    img: "",
    cinemaName: "",
    address: "",
  });

  const { currentCinema, arrCinemaCluster, arrCinema } = useSelector(
    (state) => state.CinemaReducer
  );

  useEffect(() => {
    getCinemaAPI();
  }, []);

  useEffect(() => {
    getCinemaClustersAPI();
  }, [currentCinema]);

  useEffect(() => {
    if (arrCinemaCluster !== undefined) {
      if (arrCinemaCluster.length > 0) {
        cinemaActive(0, arrCinemaCluster[0]);
      }
    }
  }, [arrCinemaCluster]);

  const getCinemaClustersAPI = () => {
    if (!currentCinema.maHeThongRap) {
      return;
    }
    let action = getCinemaClusters(currentCinema.maHeThongRap);
    dispatch(action);
  };

  const getCinemaAPI = () => {
    let action = getAllCinema();
    dispatch(action);
  };

  const cinemaActive = (index, cinema) => {
    const { tenCumRap, diaChi } = cinema;
    setActiveCinemaIndex(index);
    setCinemaInfo({
      img: currentCinema["logo"],
      cinemaName: tenCumRap,
      address: diaChi,
    });
  };

  const renderCinema = () => {
    return arrCinemaCluster.map((cinema, index) => {
      let { tenCumRap } = cinema;
      return (
        <div
          key={index}
          onClick={() => {
            cinemaActive(index, cinema);
          }}
          className={`cinema__detail px-4 py-2 ${
            activeCinemaIndex === index ? "active" : ""
          }`}
        >
          <div className="cinema__logo__left">
            <img src={currentCinema["logo"]} alt="" />
            <span className="pl-3 pr-3">{tenCumRap}</span>
          </div>
          <span className="pl-5">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      );
    });
  };

  const calenderActive = (index) => {
    setActiveDate(index);
  };

  const renderCalender = () => {
    return calender().map((date, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            calenderActive(index);
          }}
          className={`calender__card ${activeDate === index ? "active" : ""}`}
        >
          <div className="calender__header">{date.date}</div>
          <div className="calender__body">
            {index === 0 ? "Today" : date.day}
          </div>
        </div>
      );
    });
  };

  const getCinemaModal = () => {
    let action = cinemaModalAction(
      OPEN_LIST_CINEMA_MODAL,
      <CinemaModalComponent arrCinema={arrCinema} />
    );
    dispatch(action);
  };

  return (
    <div className="container py-5">
      <h2 className="movie__title mb-5">Cinema Showtimes</h2>
      <div className="cinema__content">
        <div className="cinema__header py-3">
          <span className="mx-3">Cinema</span>
          <span
            onClick={() => {
              getCinemaModal();
            }}
            className="btn--cinema"
          >
            {currentCinema.tenHeThongRap}
            <i className="fa-solid fa-chevron-down pl-4"></i>
          </span>
          <div className="modal__cinema"></div>
        </div>
        <div className="row">
          <div className="col-4 cinema__left pr-0">
            <div className="px-3 py-2">
              <div className="cinema__search">
                <input
                  className="form__cinema py-1 pl-3"
                  placeholder="Seach cinema ..."
                ></input>
                <span className="icon__search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>
            <div className="cinema__list">{renderCinema()}</div>
          </div>
          <div className="col-8 pl-0">
            <div className="cinema__info">
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/cgv.png"
                alt=""
              />
              <div className="cinema__address pl-2">
                <h3>Lịch chiếu phim CGV Vincom Đà Nẵng</h3>
                <p>
                  Tầng 4, TTTM Vincom Đà Nẵng, đường Ngô Quyền, P.An Hải Bắc,
                  Q.Sơn Trà, TP. Đà Nẵng
                </p>
              </div>
            </div>
            <div className="calender">{renderCalender()}</div>
            <div className="cinema__showTime">
              <div className="showTime__movie">
                <div className="row">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src="https://movienew.cybersoft.edu.vn/hinhanh/hieu-test_gp03.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-10">
                    <div className="movie__content">
                      <p className="age">16+</p>
                      <p className="movie__name">Home</p>
                      <p className="movie__type">Kinh dị, Gây cấn</p>
                      <p className="mt-3">2D Phụ đề</p>
                      <div className="showTimes__detail mt-2">
                        <div className="duration mr-3">
                          <p>
                            <strong>14:20 </strong>~ 15.53
                          </p>
                        </div>
                        <div className="duration mr-3">
                          <p>
                            <strong>15:20 </strong>~ 16:53
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
