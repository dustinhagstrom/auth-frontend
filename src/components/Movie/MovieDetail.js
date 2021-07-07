import React, { Component } from "react"; //bring in react, axios
import axios from "axios";
import Axios from "../utils/Axios"; //bring in Axios

const URL = "http://localhost:8080"; // set URL

export class MovieDetail extends Component {
  //make MovieDetail component
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
    cellInput: "",
    userMessage: "",
  };

  async componentDidMount() {
    try {
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${this.props.match.params.movieTitle}`
      ); //get the data associated with movie we clicked
      console.log(result.data);
      this.setState({
        //set the state with the dat
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
      //catch errors
      console.log(e);
    }
  }

  handleOnChange = (event) => {
    //handle on change for cell input and message to friend
    if (event.target.name === "cellInput") {
      this.setState({
        cellInput: event.target.value,
      });
    }
    if (event.target.name === "userMessage") {
      this.setState({
        userMessage: event.target.value,
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault(); //prevent page reload

    let parsedPhoneNumber = this.state.cellInput.split("-").join("");
    console.log(parsedPhoneNumber); //parse the cell input to remove dashes

    try {
      let userSuppliedInfo = {
        cell: parsedPhoneNumber,
        message: this.state.userMessage,
      }; //make obj from data given by user
      let jwtToken = window.localStorage.getItem("jwtToken"); //get the jwt token
      console.log(jwtToken);
      let header = { Authorization: `Bearer ${jwtToken}` }; //set header variable
      // let authorization = await Axios.get("api/send-sms", {
      //   headers: { header },
      // });
      // console.log(authorization.data);
      let movieShareWithFriend = await Axios.post(
        //make post with input obj and authorization header
        "api/send-sms",
        userSuppliedInfo,
        {
          headers: header,
        }
      );
      console.log(movieShareWithFriend);
    } catch (e) {
      //catch errors
      console.log(e);
    }
  };

  showMovieDetail() {
    //show movie detail function
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
        {/* if page loading then tell user that */}
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          // else show the details
          this.showMovieDetail()
        )}
        {/* form for submitted user supplied data */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          onSubmit={this.handleOnSubmit}
        >
          <div>
            <div>Enter Your Friend's Cell Number</div>
            <input
              type="tel"
              className="phone"
              style={{ width: "225px" }}
              name="cellInput"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              placeholder="enter a friend #"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <div>
              Tell them that you found this movie and want them to watch it with
              you.
            </div>
            <input
              type="text"
              className="textArea"
              style={{ width: "225px" }}
              name="userMessage"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <button className="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default MovieDetail; //export moviedetail
