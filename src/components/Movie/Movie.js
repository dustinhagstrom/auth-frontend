import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Movie.css";

const URL = "http://localhost:8080";
export class Movie extends Component {
  state = {
    movieInput: "",
    movieArray: [],
    error: null,
    errorMessage: "",
  };

  handleOnChange = (event) => {
    this.setState({
      movieInput: [event.target.value],
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    if (this.state.movieInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: "Please enter a movie or show!",
      });
    } else {
      try {
        let searchedShow = this.state.movieInput;
        let fetchAPIKeyData = await axios.get(`${URL}/api/appid/get-api-key`);
        let appid = fetchAPIKeyData.data.payload;
        console.log(appid);
        let userRequest = await axios.get(
          `https://www.omdbapi.com/?s=${searchedShow}&apikey=${appid}`
        );
        console.log(userRequest);
        this.setState({
          movieArray: userRequest.data.Search,
        });
      } catch (e) {
        console.log(e);
        console.log(e.message);
        this.setState({
          error: true,
          errorMessage: e.message,
        });
      }
    }
  };

  showMovieList = () => {
    return this.state.movieArray.map((item) => {
      return (
        <ul
          key={item.imdbID}
          style={{
            width: 160,
            height: 250,
            fontSize: 12,
            display: "flex",
            justifyContent: "center",
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
            <li>
              Title: {item.Title}
              Year: {item.Year}
            </li>
          </Link>
        </ul>
      );
    });
  };

  // showMovieList = () => {
  //   return this.state.movieArray.map((item) => {
  //     return (
  //       <div
  //         key={item.imdbID}
  //         style={{ width: 300, height: 300, marginRight: 25 }}
  //       >
  //         <Link
  //           to={{
  //             pathname: "/movie-detail",
  //             search: `?t=${item.title}`,
  //           }}
  //         >
  //           <div>
  //             <img src={item.Poster} alt={item.title} />
  //           </div>
  //           <div>
  //             Title: {item.Title}
  //             Year: {item.Year}
  //           </div>
  //         </Link>
  //       </div>
  //     );
  //   });
  // };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="container">
        <div className="form-text">Movie</div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit} className="form">
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Search</label>
                <input
                  type="text"
                  id="movieInput"
                  value={this.state.movieInput}
                  name="movieInput"
                  placeholder="Search Movies or Shows"
                  onChange={this.handleOnChange}
                  autoFocus
                />
                <div className="errorMessage">
                  {errorMessage && errorMessage}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div
          style={{
            width: 800,
            margin: "0 auto",
            textAlign: "center",
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {this.showMovieList()}
        </div>
      </div>

      // <div>
      //   <div className="form-div">
      //     <form onSubmit={this.handleOnSubmit}>
      //       <input
      //         type="text"
      //         className="movie-input"
      //         onChange={this.handleMovieOnChange}
      //         value={this.state.movieInput}
      //         autoFocus
      //       />
      //       <button type="submit" className="form-button">
      //         Submit
      //       </button>
      //     </form>

      //     {this.state.errorMessage && (
      //       <div style={{ color: "red", fontSize: "20px" }}>
      //         {this.state.errorMessage}
      //       </div>
      //     )}
      //   </div>
      // </div>
    );
  }
}

export default Movie;
