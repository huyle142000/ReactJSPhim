import React from "react";

export default function IframeFilm({ trailer }) {
  return (
    <>
      <iframe
        style={{
          width: "100%",
          height: "400px",
          border: "none",
          padding: "10px",
        }}
        src={trailer}
        title="Dinh Dưỡng|Ăn Kiêng Là Ăn Đủ Chất Và Kiểm Soát Thức Ăn Hay Chúng Ta Nghĩ Ăn Kiêng Là Nhịn Đói, Ăn ít"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </>
  );
}
