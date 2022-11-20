import moment from "moment/moment";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  bookTicketAction,
  getSeatBookingAction,
} from "../../redux/actions/TIcketBookingAction";
import { PLAY_LOADING, STOP_LOADING } from "../../redux/type/SpinnerType";
import { SELECT_TICKET } from "../../redux/type/TIcketBookingTypes";
import "./Booking.css";

export default function Booking(props) {
  const { arrSelectedSeat, movieInfo, arrSeat } = useSelector(
    (state) => state.TicketBookingReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { maLichChieu, ngayChieuGioChieu } = location.state.path;
  useSelector((state) => state.PreloadingReducer);
  const { tenPhim, tenCumRap, diaChi, hinhAnh } = movieInfo;

  useEffect(() => {
    getSeatBookingAPI(maLichChieu);
    window.scrollTo(0, 0);
    dispatch({ type: PLAY_LOADING });
    setTimeout(() => {
      dispatch({ type: STOP_LOADING });
    }, 1800);
  }, []);

  const getSeatBookingAPI = (showTimeId) => {
    let action = getSeatBookingAction(showTimeId);
    dispatch(action);
  };

  const selectSeat = (seat) => {
    if (seat.daDat) return;
    dispatch({
      type: SELECT_TICKET,
      selectedSeat: seat,
    });
  };

  const bookTicketAPI = () => {
    //check empty selected seat
    if (arrSelectedSeat?.length === 0 || arrSelectedSeat === null) {
      return;
    }

    let arrTicket = [];
    arrSelectedSeat.map((seat) => {
      arrTicket = [
        ...arrTicket,
        {
          maGhe: seat.maGhe,
          giaVe: Number(seat.giaVe),
        },
      ];
    });
    let action = bookTicketAction({
      maLichChieu: maLichChieu,
      danhSachVe: arrTicket,
    });
    dispatch(action);
    history.push("/");
  };

  const renderSeat = () => {
    return arrSeat?.map((seat, index) => {
      const { maGhe, tenGhe, loaiGhe, giaVe, daDat } = seat;
      let seatStyle = "seat ";
      if (loaiGhe === "Vip") {
        seatStyle += "seat__vip ";
      }
      if (daDat) {
        seatStyle += "seat__booked";
      }
      let selectedSeatClass = "";
      let indexSelectedSeat = arrSelectedSeat.findIndex(
        (seatSelected) => seatSelected.maGhe === seat.maGhe
      );
      if (indexSelectedSeat !== -1) {
        selectedSeatClass = "seat__selected";
      }
      console.log(seat);
      return (
        <Fragment key={maGhe}>
          <div
            onClick={() => {
              selectSeat(seat);
            }}
            className={seatStyle + ` ${selectedSeatClass}`}
          ></div>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  const renderTitleSeat = () => {
    if (arrSelectedSeat?.length === 0) {
      return <div className="msg__ticket ml-3">No seat has been selected</div>;
    } else {
      return (
        <Fragment>
          <div className="col-4 seat__title">Seat</div>
          <div className="col-4 seat__title">Type</div>
          <div className="col-4 seat__title">Price</div>
        </Fragment>
      );
    }
  };

  const renderSelectingSeat = () => {
    return arrSelectedSeat?.map((seat) => {
      return (
        <Fragment key={seat.maGhe}>
          <div className="col-4 pl-4">{seat.tenGhe}</div>
          <div className="col-4">{seat.loaiGhe}</div>
          <div className="col-4">{seat.giaVe.toLocaleString()}</div>
        </Fragment>
      );
    });
  };

  const renderMovieInfo = () => {
    return (
      <Fragment>
        <div className="mb-3">
          <img className="img-fluid" src={hinhAnh} alt="" />
        </div>
        <div className="movie__info">
          <h3>Movie Name</h3>
          <p>{tenPhim}</p>
          <div className="calender__container">
            <div className="calender__ticket">
              <h3>Date</h3>
              <p>{moment(ngayChieuGioChieu).format("DD-MM-YYYY")}</p>
            </div>
            <div className="calender__ticket ml-5">
              <h3>Time</h3>
              <p>{moment(ngayChieuGioChieu).format("HH:MM A")}</p>
            </div>
          </div>
          <h3>Cinema</h3>
          <p>{tenCumRap}</p>
          <h3>Address</h3>
          <p>{diaChi}</p>
          <h3>Seats detail</h3>
        </div>
        <div className="row ticket__bill">
          {renderTitleSeat()}
          {renderSelectingSeat()}
        </div>
        <div className="d-flex justify-content-between mt-2">
          <p className="title__total">Total</p>
          <p className="total__price">
            {arrSelectedSeat
              .reduce((total, seat) => total + Number(seat.giaVe), 0)
              .toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => {
            bookTicketAPI();
          }}
          className="btn btn-success btn--payment mt-1"
        >
          Payment
        </button>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="booking__bg">
        <div className="bg__overlay"></div>
        <img src={hinhAnh} alt="" />
      </div>
      <div className="container my-4">
        <div className="row">
          <div className="col-9">
            <div className="booking__left">
              <div className="screen"></div>
              <div className="screen__shape text-center mb-4"></div>
              <div className="seat__list">{renderSeat()}</div>
              <div className="seat__type">
                <div className="seat "></div>
                <p>Normal seat</p>
                <div className="seat seat__vip"></div>
                <p>VIP seat</p>
                <div className="seat seat__booked"></div>
                <p>Booked seat</p>
                <div className="seat seat__selected"></div>
                <p>Selecting seat</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card__shadow pl-3 pb-3">
              <div className="ticket__info">{renderMovieInfo()}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
