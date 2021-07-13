import React, { Component } from "react"; //bring in react, axios
import axios from "axios";
import Axios from "../utils/Axios"; //bring in Axios
import { toast } from "react-toastify";

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
    friendsArray: [],
    selectedFriendFirstName: "",
    selectedFriendLastName: "",
    selectedFriendID: "",
    selectedFriendMobileNumber: "",
    friendMessage: "",
    originalMessage: "",
  };

  async componentDidMount() {
    this.fetchMovie();
    this.fetchAllFriends();
  }

  fetchAllFriends = async () => {
    try {
      let allFriends = await Axios.get("/api/friend/get-all-friends");
      this.setState({
        friendsArray: allFriends.data.payload.friends,
      });
    } catch (e) {
      console.log(e);
    }
  };

  fetchMovie = async () => {
    try {
      let result = await axios.get(
        `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${this.props.match.params.movieTitle}`
      ); //get the data associated with movie we clicked
      this.setState(
        {
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
        },
        () => {
          this.setState({
            friendMessage: `I think this movie is dope. ${this.state.Title}, ${this.state.Actors} are in it. This is the plot ${this.state.Plot}`,
            originalMessage: `I think this movie is dope. ${this.state.Title}, ${this.state.Actors} are in it. This is the plot ${this.state.Plot}`,
          });
        }
      );
      console.log(result);
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

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let message = this.state.friendMessage;
      let result = await Axios.post("/api/send-sms", {
        cell: this.state.selectedFriendMobileNumber,
        message: message,
      });
      console.log(result);
    } catch (e) {
      console.log(e.response);
    }
  };
  handleSelectChange = (event) => {
    console.log(JSON.parse(event.target.value));

    let selectedUser = JSON.parse(event.target.value);

    this.setState({
      selectedFriendFirstName: selectedUser.firstName,
      selectedFriendLastName: selectedUser.lastName,
      selectedFriendID: selectedUser._id,
      selectedFriendMobileNumber: selectedUser.mobileNumber,
      friendMessage: `${selectedUser.firstName}, ${this.state.originalMessage}`,
    });
  };

  render() {
    return (
      <div>
        {/* if page loading then tell user that */}
        {this.state.isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            ...Loading
          </div>
        ) : (
          <div>
            {this.showMovieDetail()}
            <div style={{ width: 250, margin: "0 auto", textAlign: "center" }}>
              <select onChange={this.handleSelectChange}>
                <option>Select A Friend</option>
                {this.state.friendsArray.map((friend) => {
                  return (
                    <option key={friend._id} value={JSON.stringify(friend)}>
                      {friend.firstName} {friend.lastName}
                    </option>
                  );
                })}
              </select>
              <textarea defaultValue={this.state.friendMessage} />
              <button onClick={this.handleFormSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MovieDetail; //export moviedetail
