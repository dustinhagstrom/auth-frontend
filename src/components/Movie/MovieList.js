import React from "react";
import { Link } from "react-router-dom";

function MovieList(props) {
  return props.movieArray.map((item) => {
    return (
      <>
        <ul
          key={item.imdbID}
          style={{
            width: 125,
            height: 195,
            fontSize: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Link
            to={{
              pathname: `/movie-detail/${item.Title}`,
              search: `?t=${item.Title}`,
            }}
          >
            <li>
              <img
                style={{
                  textAlign: "center",
                }}
                src={item.Poster}
              />
            </li>
            <li>Title: {item.Title}</li>
            <li>Year: {item.Year}</li>
          </Link>
        </ul>
      </>
    );
  });
}

export default MovieList;
