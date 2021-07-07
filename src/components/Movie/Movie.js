import React, { Component } from "react"; //bring in react, axios, react-router-dom
import axios from "axios";
import { Link } from "react-router-dom";

import "./Movie.css"; //bring in css

const URL = "http://localhost:8080"; //set URL variable
export class Movie extends Component {
  // make movie component
  state = {
    movieInput: "",
    movieArray: [],
    error: null,
    errorMessage: "",
  };

  async componentDidMount() {
    //get some random movies to load on the movie page on initial load and on refresh.

    try {
      let searchedMovieTitle =
        window.sessionStorage.getItem("searchedMovieTitle"); //if we have a searched movie title in session storage then get it.

      if (searchedMovieTitle) {
        //if we have then send get req to get data
        let userRequest = await axios.get(
          `https://www.omdbapi.com/?s=${searchedMovieTitle}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
        );
        console.log(userRequest.data.Search);
        this.setState({
          //set movie array with data
          movieArray: userRequest.data.Search,
        });
      } else {
        let randomMovieArray = [];
        for (let i = 0; i < 20; i++) {
          let myRando = Math.floor((Math.random() + 1) * 1000000);
          let userRequest = await axios.get(
            `https://www.omdbapi.com/?i=tt${myRando}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
          );
          console.log(userRequest.data);
          if (userRequest.data && userRequest.data.Poster !== "N/A") {
            randomMovieArray.push(userRequest.data);
          }
          this.setState({
            movieArray: randomMovieArray,
          });
        }
      }
    } catch (e) {
      //catch errors
      console.log(e);
    }
  }

  handleOnChange = (event) => {
    //handle change to set state for inputs
    this.setState({
      movieInput: [event.target.value],
    });
  };

  handleOnSubmit = async (event) => {
    // form submission
    event.preventDefault(); //prevent reload of whole page

    if (this.state.movieInput.length === 0) {
      //if we don't have input, error -> need input
      this.setState({
        error: true,
        errorMessage: "Please enter a movie or show!",
      });
    } else {
      //else search the input
      try {
        let searchedShow = this.state.movieInput;
        let userRequest = await axios.get(
          `https://www.omdbapi.com/?s=${searchedShow}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
        );

        window.sessionStorage.setItem(
          //this sets the local session storage for the searched movie
          "searchedMovieTitle",
          this.state.movieInput
        );

        this.setState({
          //make array with search data
          movieArray: userRequest.data.Search,
        });
      } catch (e) {
        //catch errors
        console.log(e);
        console.log(e.message);
        this.setState({
          //set error states
          error: true,
          errorMessage: e.message,
        });
      }
    }
  };

  showMovieList = () => {
    // loop through movieArray and display image and data on page and wrap data with links
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
    //the form with the input field, button and below that is an array to display all of the data for searched movies
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

export default Movie; //export Movie
