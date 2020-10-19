import React, { Component } from 'react';
import axios from 'axios';
import Laughing from './img/laughing.svg';
import './JokeList.css';

const JOKE_API_LINK = 'https://icanhazdadjoke.com/';
class JokeList extends Component {
  static defaultProps = { jokeNum: 10 };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }

  async componentDidMount() {
    let jokes = [];
    while (jokes.length < 10) {
      let res = await axios.get(JOKE_API_LINK, {
        headers: { Accept: 'application/json' },
      });
      let joke = res.data.joke;
      jokes.push(joke);
    }
    this.setState({ jokes: jokes });
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> jokes
          </h1>
          <img src={Laughing} alt="laughing emoji" />
          <button className="JokeList-getMore">New Jokes</button>
        </div>
        <div className="JokeList-jokes">
          {this.state.jokes.map((joke) => (
            <div>{joke}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
