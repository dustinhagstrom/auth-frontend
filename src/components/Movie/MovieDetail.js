import React, { Component } from "react";
import axios from "axios";

const URL = "http://localhost:8080";

export class MovieDetail extends Component {
  state = {
    Actors: "",
    Awards: "",
    Country: "",
    Plot: "",
    Poster: "",
    Rated: "",
    Ratings: [],
    Title: "",
    imdbID: "",
    isLoading: true,
  };

  async componentDidMount() {
    try {
      let fetchAPIKeyData = await axios.get(`${URL}/api/appid/get-api-key`);
      let appid = fetchAPIKeyData.data.payload;
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${appid}&t=${this.props.match.params.movieTitle}`
      );
      console.log(result.data);
      this.setState({
        Actors: result.data.Actors,
        Awards: result.data.Awards,
        Country: result.data.Country,
        Plot: result.data.Plot,
        Poster: result.data.Poster,
        Rated: result.data.Rated,
        Ratings: result.data.Ratings,
        Title: result.data.Title,
        imdbID: result.data.imdbID,
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  showMovieDetail() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <img src={this.state.Poster} alt={this.state.Title} />
        </div>
        <div style={{ width: 400, textOverflow: "ellipsis" }}>
          <div>Actors: {this.state.Actors}</div>
          <div>Awards: {this.state.Awards},</div>
          <div>Country: {this.state.Country}</div>
          <div>Plot: {this.state.Plot}</div>
          <div>Poster: {this.state.Poster}</div>
          <div>Rated: {this.state.Rated}</div>
          <div>
            Ratings:{" "}
            {this.state.Ratings.map((item) => {
              return (
                <span key={item.Source}>
                  {item.Source} {item.Value}
                </span>
              );
            })}
          </div>
          <div>Title: {this.state.Title}</div>
          <div>imdbID: {this.state.imdbID}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          this.showMovieDetail()
        )}
      </div>
    );
  }
}

export default MovieDetail;
