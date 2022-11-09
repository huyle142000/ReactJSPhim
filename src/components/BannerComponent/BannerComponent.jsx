import React, { useEffect } from "react";
import Slider from "react-slick";
import "./banner.css";
import { useDispatch, useSelector } from "react-redux";
import { getBanner, playTrailer } from "../../redux/actions/BannerAction";
import IframeFilm from "./IframeFilm/IframeFilm";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

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
      <i
        className="fa-solid fa-angles-right banner_icon-right"
        style={{ fontSize: "40px", color: "#fff" }}
      ></i>
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
      <i
        className="fa-solid fa-angles-left banner_icon-left"
        style={{ fontSize: "40px", color: "#fff" }}
      ></i>
    </div>
  );
}
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
  };
  const settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
  };
  const dispatch = useDispatch();
  const { arrPhim } = useSelector((state) => state.BannerReducer);
  useEffect(() => {
    dispatch(getBanner());
  }, []);

  const renderPhim = () => {
    return arrPhim?.map((phim) => {
      const trailerphim = phim.trailer;
      return (
        <div key={phim.maPhim}>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${phim.hinhAnh})`,
              filter: "grayscale(40%)",
            }}
          >
            <div
              className="position-absolute banner_wrap-icon"
              style={{
                top: "50%",
                left: "50%",
              }}
              onClick={() => {
                dispatch(playTrailer(<IframeFilm trailer={trailerphim} />));
              }}
            >
              <i
                className="fa-regular fa-circle-play  banner_play_icon"
                style={{ fontSize: "50px" }}
              ></i>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderPhimMini = () => {
    return arrPhim?.map((phim) => {
      const trailerphim = phim.trailer;
      return (
        <div key={phim.maPhim} className="position-relative banner_wrap-mini">
          <div
            className="bannerMini"
            style={{
              backgroundImage: `url(${phim.hinhAnh})`,
              filter: "grayscale(40%)",
            }}
          ></div>
          <div
            className="position-absolute banner_wrap-icon-mini"
            style={{}}
            onClick={() => {
              dispatch(playTrailer(<IframeFilm trailer={trailerphim} />));
            }}
          >
            <i className="fa-regular fa-circle-play  banner_play_icon-mini"></i>
          </div>
          <div className="banner_content container">
            <div className="banner_content-title">
              <h6>{phim.tenPhim}</h6>
              <h6
                className="banner_mota"
                style={{ fontSize: "12px", height: "30px", overflow: "hidden" }}
              >
                {phim.moTa}
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
      <div className="bg-dark ">
        <Slider {...settings}>{renderPhim()}</Slider>
        <Slider {...settings2}>{renderPhimMini()}</Slider>
      </div>
    </>
  );
}
