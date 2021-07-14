import React, { Component } from "react"; //bring in react, axios, react-router-dom
import axios from "axios";

import MovieList from "./MovieList";

import "./Movie.css"; //bring in css

export class Movie extends Component {
  // make movie component
  state = {
    movieInput: "",
    movieArray1: [],
    movieArray2: [],
    movieArray3: [],
    error: null,
    errorMessage: "",
    pageArray: [], //an array of total number of pages in pagination. ex. [ 1, 2, 3, 4, 5, 6, ...]
    totalCount: 0, //total number of movie titles
    totalPage: 0, //total # of pages
    perPage: 10, //max number of titles per page
    currentPage: 1,
    maxPageLimit: 10, //max number of pages in between prev and next buttons
    minPageLimit: 0,
  };

  getTotalPages = (totalResults, perPage) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalResults / perPage); i++) {
      pages.push(i);
    }
    return pages;
  };

  async componentDidMount() {
    //get some random movies to load on the movie page on initial load and on refresh.

    try {
      let searchedMovieTitle =
        window.sessionStorage.getItem("searchedMovieTitle"); //if we have a searched movie title in session storage then get it.

      if (searchedMovieTitle) {
        let result = await this.handleSearchedMovie(searchedMovieTitle); //throw into movie get req func.

        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );

        this.setState({
          //set movie array with data
          movieInput: searchedMovieTitle, //set to our session storage movie
          movieArray1: result.data.Search, //set following to return of movie get req.
          totalCount: +result.data.totalResults,
          pageArray: totalPageArray, //set pagination array
          // movieArray2: [],
          // movieArray3: [],
        });
      }
      //if we didn't have a session storage movie title then do random movie from our preset array
      else {
        let randomMovieTitle = this.handleRandomTitle(); //handle random movie generation from our random movie array
        let result = await this.handleSearchedMovie(randomMovieTitle); //handle get req w/random movie

        let totalPageArray = this.getTotalPages(
          //input total results and max results per page to calculate # pages.
          +result.data.totalResults, //convert string to number.
          this.state.perPage
        );

        this.setState({
          movie: randomMovieTitle,
          movieArray1: result.data.Search,
          totalCount: +result.data.totalResults,
          pageArray: totalPageArray,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  handleRandomTitle = () => {
    let randomMovieArray = [
      "big trouble in little china",
      "the simpsons",
      "rush hour",
      "the godfather",
      "luca",
      "pulp fiction",
      "the matrix",
    ];

    let searchedMovieIndex = Math.floor(
      Math.random() * randomMovieArray.length
    );
    return randomMovieArray[searchedMovieIndex];
  };

  handleSearchedMovie = async (movieTitle) => {
    try {
      let randomMovieData = await axios.get(
        `https://www.omdbapi.com/?s=${movieTitle}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}&page=${this.state.currentPage}`
      );
      return randomMovieData;
    } catch (e) {
      return e;
    }
  };

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
        let result = await this.handleSearchedMovie(this.state.movieInput);

        window.sessionStorage.setItem(
          //this sets the local session storage for the searched movie
          "searchedMovieTitle",
          this.state.movieInput
        );
        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );

        this.setState({
          movieArray1: result.data.Search,
          totalCount: +result.data.totalResults,
          pageArray: totalPageArray,
        });
      } catch (e) {
        //catch errors
        this.setState({
          //set error states
          error: true,
          errorMessage: e.message,
        });
      }
    }
  };

  showPagination = () => {
    let currentPage = this.state.currentPage;
    let maxPageLimit = this.state.maxPageLimit;
    let minPageLimit = this.state.minPageLimit;

    const buildPagination = () => {
      return (
        <>
          {this.state.pageArray
            .filter(
              (number) => number < maxPageLimit + 1 && number > minPageLimit
            )
            .map((number) => {
              return (
                <span
                  onClick={() => {
                    this.handleGoToPage(number);
                  }}
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                    color: currentPage === number ? "red" : "black",
                    cursor: "pointer",
                  }}
                  key={number.toString()}
                >
                  {number}
                </span>
              );
            })}
        </>
      );
    };

    return (
      <div>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {buildPagination()}
        </ul>
      </div>
    );
  };

  handleGoToPage = (number) => {
    this.setState(
      {
        currentPage: number,
      },
      async () => {
        let result = await this.handleSearchedMovie(this.state.movieInput);
        this.setState({
          movieArray1: result.data.Search,
        });
      }
    );
  };

  nextPage = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: prevState.currentPage + 1,
        };
      },
      async () => {
        let movie = "";

        let searchedMovieTitle =
          window.sessionStorage.getItem("searchedMovieTitle");

        movie = searchedMovieTitle
          ? window.sessionStorage.getItem("searchedMovieTitle")
          : this.state.movie;

        let result = await this.handleSearchedMovie(movie);
        this.setState({
          movieArray1: result.data.Search,
        });
      }
    );

    if (this.state.currentPage + 1 > this.state.maxPageLimit) {
      this.setState({
        maxPageLimit: this.state.maxPageLimit + this.state.perPage,
        minPageLimit: this.state.minPageLimit + this.state.perPage,
      });
    }
  };

  prevPage = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: prevState.currentPage - 1,
        };
      },
      async () => {
        let movie = "";

        let searchedMovieTitle =
          window.sessionStorage.getItem("searchedMovieTitle");

        movie = searchedMovieTitle
          ? window.sessionStorage.getItem("searchedMovieTitle")
          : this.state.movie;

        let result = await this.handleSearchedMovie(movie);
        this.setState({
          movieArray1: result.data.Search,
        });
      }
    );

    if ((this.state.currentPage - 1) % this.state.perPage === 0) {
      this.setState({
        maxPageLimit: this.state.maxPageLimit - this.state.perPage,
        minPageLimit: this.state.minPageLimit - this.state.perPage,
      });
    }
  };

  render() {
    //the form with the input field, button and below that is an array to display all of the data for searched movies
    const { errorMessage } = this.state;
    return (
      <div>
        <div className="movie-text">Movie</div>
        <div>
          <form className="movie-form" onSubmit={this.handleOnSubmit}>
            <div className="form-group">
              <div className="group-container">
                <div className="input-container">
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
                </div>
                <div className="error-message">
                  {errorMessage && errorMessage}
                </div>
              </div>
            </div>
            <div className="submit-container">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="movies-section">
          <h3>Coolest Movie</h3>
          <div className="movie-list">
            <MovieList movieArray={this.state.movieArray1} />
          </div>
          {this.state.totalCount <= 10 ? (
            ""
          ) : (
            <div className="movie-list-buttons-div">
              <button
                className="movie-list-buttons"
                disabled={this.state.currentPage === 1 ? true : false}
                onClick={this.prevPage}
              >
                Prev
              </button>
              {this.showPagination()}
              <button
                className="movie-list-buttons"
                disabled={
                  this.state.currentPage ===
                  this.state.pageArray[this.state.pageArray.length - 1]
                    ? true
                    : false
                }
                onClick={this.nextPage}
              >
                Next
              </button>
            </div>
          )}
          {/* <h3>Fan Favorite</h3>
          <div className="movie-list">
            <MovieList movieArray={this.state.movieArray2} />
          </div>
          <h3>Classic</h3>
          <div className="movie-list">
            <MovieList movieArray={this.state.movieArray3} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Movie; //export Movie
