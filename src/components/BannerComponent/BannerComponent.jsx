import React, { useEffect } from "react";
import Slider from "react-slick";
import "./banner.css";
import { useDispatch, useSelector } from "react-redux";
import { getBanner, playTrailer } from "../../redux/actions/BannerAction";
import IframeFilm from "./IframeFilm/IframeFilm";
import { NavLink } from "react-router-dom";
import { Calendar } from "../../redux/actions/CinemaAction";
import moment from "moment";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  useSelector((state) => state.PreloadingReducer);

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "10000",
        marginRight: "70px",
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angles-right banner_icon-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        zIndex: "10000",
        marginLeft: "40px",
      }}
      onClick={onClick}
    >
      <i className="fa-solid fa-angles-left banner_icon-left"></i>
    </div>
  );
}
var date = new Date();
let arrCur = [];
let times = "";
for (let i = 0; i < 8; i++) {
  if (i === 0) {
    times = moment(date.setDate(date.getDate()));
  } else {
    times = moment(date.setDate(date.getDate() + 1));
  }
  arrCur.push(times);
}
let convertArrDate = arrCur.map((date) => {
  return moment(date).format("DDMMYY");
});
let dateNew = new Date();
let abc = convertArrDate.splice(1, convertArrDate.length);

export default function BannerComponent() {
  const settings = {
    dots: true,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 300,
        settings: {
          dots: false,
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  const settings3 = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const { arrPhim } = useSelector((state) => state.BannerReducer);
  useEffect(() => {
    dispatch(getBanner());
  }, []);
  const renderPhim = () => {
    return arrPhim?.map((phim, i) => {
      let convertDate = moment(phim.ngayKhoiChieu).format("DDMMYY");
      return (
        <div key={phim.maPhim} className="position-relative">
          <div
            className="banner"
            style={{
              backgroundImage: `url(${phim.hinhAnh})`,
              filter: "grayscale(10%)",
            }}
          >
            <div className="container banner_content-mid">
              <div className="row">
                <div className="col-sm-12 col-xs-6 col-md-6 col-xl-6 ">
                  <img src={phim.hinhAnh} alt="" className="mr-auto ml-auto" />
                </div>
                <div className="col-sm-12 col-xs-6 col-md-6 col-xl-6">
                  <div className="mt-auto">
                    <h2>{phim.tenPhim}</h2>
                    <h4>
                      {phim.moTa.length > 50
                        ? phim.moTa.substring(0, 150) + "..."
                        : phim.moTa}
                    </h4>
                    <div className="mt-4">
                      <button
                        className="btn btn_white mr-3"
                        onClick={() => {
                          dispatch(
                            playTrailer(
                              <IframeFilm phim={phim} isContent={true} />
                            )
                          );
                        }}
                      >
                        Play Trailer
                      </button>
                      <NavLink to={`/detail/${phim.maPhim}`}>
                        <button className="btn btn_primary">Buy ticket</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner_overlay-dark"></div>
          </div>
        </div>
      );
    });
  };
  const renderPhimDangChieu = () => {
    return arrPhim?.map((phim) => {
      let convertDate = moment(phim.ngayKhoiChieu);
      // if (convertDate.format("DDMMYY") === moment(dateNew).format("DDMMYY")) {
      return (
        <div key={phim.maPhim} className="position-relative banner_wrap-mini">
          <div
            className="bannerMini"
            style={{
              backgroundImage: `url(${phim.hinhAnh})`,
            }}
          ></div>
          <div className="bannerMini-date">
            <span>{convertDate.format("DD-MM-YYYY")}</span>
          </div>
          <div
            className="position-absolute banner_wrap-icon-mini"
            onClick={() => {
              dispatch(
                playTrailer(<IframeFilm phim={phim} isContent={true} />)
              );
            }}
          >
            <i className="fa-regular fa-circle-play  banner_play_icon-mini"></i>
          </div>
          <div className="banner_content container">
            <div className="banner_content-title">
              <h6>{phim.tenPhim}</h6>
              <h6 className="banner_mota">
                <NavLink to={`/detail/${phim.maPhim}`}>
                  <button className="btn btn_primary">Buy ticket</button>
                </NavLink>
              </h6>
            </div>
          </div>
          <div className="banner_overlay"></div>
        </div>
      );
      // }
    });
  };
  const renderPhimSapChieu = () => {
    return arrPhim?.map((phim) => {
      let convertDated = moment(phim.ngayKhoiChieu);
      return (
        <div key={phim.maPhim} className="position-relative banner_wrap-mini">
          <div
            className="bannerMini"
            style={{
              backgroundImage: `url(${phim.hinhAnh})`,
            }}
          ></div>
          <div className="bannerMini-date">
            <span>{convertDated.format("DD-MM-YYYY")}</span>
          </div>
          <div
            className="position-absolute banner_wrap-icon-mini"
            onClick={() => {
              dispatch(
                playTrailer(<IframeFilm phim={phim} isContent={true} />)
              );
            }}
          >
            <i className="fa-regular fa-circle-play  banner_play_icon-mini"></i>
          </div>
          <div className="banner_content container">
            <div className="banner_content-title">
              <h6>{phim.tenPhim}</h6>
              <h6 className="banner_mota">
                <NavLink to={`/detail/${phim.maPhim}`}>
                  <button className="btn btn_primary">Buy ticket</button>
                </NavLink>
              </h6>
            </div>
          </div>
          <div className="banner_overlay"></div>
        </div>
      );
    });
  };
  return (
    <>
      <div>
        <Slider {...settings}>{renderPhim()}</Slider>
        <div className="banner_top py-5">
          <div className="container banner_top-img1">
            <div className="container">
              <div className="text-center ">
                <div className="position-relative d-inline-block">
                  <i className="fa-solid fa-star star star1"></i>
                  <i className="fa-solid fa-star star star2"></i>
                  <i className="fa-solid fa-star star star3"></i>
                  <i className="fa-solid fa-star star star4"></i>
                  <i className="fa-solid fa-star star star5"></i>
                  <i className="fa-solid fa-star star star6"></i>
                  <i className="fa-solid fa-star star star7"></i>
                  <i className="fa-solid fa-star star star8"></i>
                  <i className="fa-solid fa-star star star9"></i>
                  <i className="fa-solid fa-star star star10"></i>
                  <h2 className="text-shadow banner-dangchieu">
                    Phim Đang Chiếu
                  </h2>
                </div>
                <div className="py-5 banner_top-img2" id="movie">
                  <Slider {...settings2}>{renderPhimDangChieu()}</Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" banner_bottom py-5">
          <div className="container">
            <div className="text-center">
              <h2 className="text-shadow banner-sapchieu ">Phim Sắp Chiếu</h2>
              <div className="py-5">
                <Slider {...settings3}>{renderPhimSapChieu()}</Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
