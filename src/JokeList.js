import React, { Component } from 'react';
import axios from 'axios';
import Laughing from './img/laughing.svg';
import Joke from './Joke';
import './JokeList.css';
import { v4 as uuidv4 } from 'uuid';

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
      jokes.push({ id: uuidv4(), text: joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  }

  handleVote(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      ),
    }));
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
            <Joke
              text={joke.text}
              votes={joke.votes}
              key={joke.id}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
