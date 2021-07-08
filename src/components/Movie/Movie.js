import React, { Component } from "react"; //bring in react, axios, react-router-dom
import axios from "axios";
import { Link } from "react-router-dom";

import MovieList from "./MovieList";

import "./Movie.css"; //bring in css

const URL = "http://localhost:8080"; //set URL variable
export class Movie extends Component {
  // make movie component
  state = {
    movieInput: "",
    movieArray1: [],
    movieArray2: [],
    movieArray3: [],
    error: null,
    errorMessage: "",
    pageArray: [],
    totalCount: 0,
    totalPage: 0,
    perPage: 10,
    currentPage: 1,
    maxPageLimit: 10,
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
        let result = await this.handleSearchedMovie(searchedMovieTitle);

        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );

        this.setState({
          //set movie array with data
          movieArray1: result.data.Search,
          totalPage: +result.data.totalResults,
          pageArray: totalPageArray,
          // movieArray2: [],
          // movieArray3: [],
        });
      } else {
        let randomMovieTitle = this.handleRandomTitle();
        // let result = await this.handleSearchedMovie(randomMovieTitle);
        let result = await this.handleSearchedMovie("batman");

        let totalPageArray = this.getTotalPages(
          +result.data.totalResults,
          this.state.perPage
        );
        console.log(totalPageArray);

        this.setState({
          movieArray1: result.data.Search,
          totalPage: +result.data.totalResults,
          pageArray: totalPageArray,
        });

        // let randomMovieTitle1 = this.handleRandomTitle();
        // let randomMovieTitle2 = this.handleRandomTitle();
        // let randomMovieTitle3 = this.handleRandomTitle();
        // let result1 = await this.handleSearchedMovie(randomMovieTitle1);
        // let result2 = await this.handleSearchedMovie(randomMovieTitle2);
        // let result3 = await this.handleSearchedMovie(randomMovieTitle3);

        // let getAllPromiseMovies = Promise.all([result1, result2, result3]);

        // let resolvedMovie = await getAllPromiseMovies;
        // console.log(resolvedMovie);
        // this.setState({
        //   //set movie array with data
        //   movieArray1: resolvedMovie[0].data.Search,
        //   movieArray2: resolvedMovie[1].data.Search,
        //   movieArray3: resolvedMovie[2].data.Search,
        // });
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

        this.setState({
          //make array with search data
          movieArray1: result.data.Search,
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

  showPagination = () => {
    let totalPages = this.state.totalPage;
    let perPage = this.state.perPage;
    let currentPage = this.state.currentPage;
    let maxPageLimit = this.state.maxPageLimit;
    let minPageLimit = this.state.minPageLimit;

    const buildPagination = () => {
      return (
        <>
          {this.state.pageArray.map((number) => {
            console.log(number < maxPageLimit + 1 && number > minPageLimit);

            if (number < maxPageLimit + 1 && number > minPageLimit) {
              return (
                <span
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                    color: currentPage === number ? "red" : "black",
                  }}
                  key={number}
                >
                  {number}
                </span>
              );
            }
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

  nextPage = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          currentPage: prevState.currentPage + 1,
        };
      },
      async () => {
        let result = await this.handleSearchedMovie("batman");
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
        let result = await this.handleSearchedMovie("batman");
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
