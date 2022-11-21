import moment from "moment";
import { useEffect, useState } from "react";
import { bothServiceToken } from "../../Service/BothTokenService";
import { getCinemaQuery } from "../../utils/cinemaConfigString";
import { CINEMA_CLUSTERS, CINEMA_INFO, MA_NHOM } from "../../utils/setting";
import {
  GET_ALL_CINEMA,
  GET_LIST_CINEMA_CLUSTERS,
  GET_LIST_CINEMA_RELEASE,
} from "../type/CinemaType";
import { GET_DETAIL_FILM } from "../type/MovieManagerType";

export const getAllCinema = () => {
  return (dispatch) => {
    let promise = bothServiceToken.get(CINEMA_INFO);
    promise
      .then((res) => {
        dispatch({
          type: GET_ALL_CINEMA,
          arrCinema: res.data.content,
        });
      })
      .catch((err) => {});
  };
};

export const getCinemaCluster = (payload) => {
  return (dispatch) => {
    bothServiceToken
      .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${payload}`)
      .then((res) => {
        dispatch({
          type: GET_LIST_CINEMA_CLUSTERS,
          arrCinema: res.data.content,
        });
      })
      .catch((err) => {});
  };
};
export const getCinemaRelease = (payload) => {
  return (dispatch) => {
    bothServiceToken
      .get(
        `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${payload}&maNhom=${MA_NHOM}`
      )
      .then((res) => {
        dispatch({
          type: GET_LIST_CINEMA_RELEASE,
          arrCinema: res.data.content,
        });
      })
      .catch((err) => {});
  };
};
export function getReleaseFilm(maPhim) {
  return (dispatch) => {
    bothServiceToken
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
      .then((res) => {
        dispatch({
          type: GET_DETAIL_FILM,
          payload: res.data.content,
        });
      })
      .catch((err) => {});
  };
}

export const Calendar = () => {
  let dateNew = new Date();
  let currentDate = moment(dateNew).format("DDMMYY");

  const [release, setReleases] = useState(currentDate);
  const [activeDate, setActiveDate] = useState({
    date: 0,
  });
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer1 = setTimeout(() => {
      return setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [show]);
  // Create Calendar
  const arr = [];
  var date = new Date();
  let times;
  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      times = moment(date.setDate(date.getDate()));
    } else {
      times = moment(date.setDate(date.getDate() + 1));
    }
    arr.push(times);
  }
  const renderCalender = () => {
    const month = moment(date).format("MMMM ");
    const year = moment(date).format(" YYYY");
    return (
      <>
        <div
          className="cinema_text"
          style={{ fontSize: "25px", borderBottom: "2px solid #fff" }}
        >
          <span className="cinema_text-month cinema_text">{month}</span>
          <span className="cinema_text-year">{year}</span>
        </div>
        <div className="row pl-2 pr-2 date-content">
          {arr.map((time, i) => {
            let a = moment(time).isoWeekday();
            return (
              <div key={i} className={"col cinema_release"}>
                <label
                  htmlFor={time.format("DDMMYY")}
                  className={
                    activeDate.date === i
                      ? "col cinema_release-label active"
                      : "col cinema_release-label"
                  }
                  onClick={() => {
                    setActiveDate({
                      date: i,
                    });
                    setShow(true);
                  }}
                >
                  {time.isoWeekday() === 7 ? (
                    <p className="cinema_release-day">CN</p>
                  ) : (
                    <p className="cinema_release-day">
                      Thứ {time.isoWeekday() + 1}
                    </p>
                  )}
                  <span className="cinema_release-date mt-1">
                    {time.date()}
                  </span>
                  <input
                    onChange={(e) => {
                      setReleases(e.target.value);
                    }}
                    type="radio"
                    value={time.format("DDMMYY")}
                    id={time.format("DDMMYY")}
                    name="date"
                    className="cinema_release-input"
                  />
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return { renderCalender, release, show, setShow, arr };
};
