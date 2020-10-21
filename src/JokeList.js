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
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || `[]`),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((joke) => joke.text));
    console.log(this.seenJokes);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let jokes = [];
      while (jokes.length < 10) {
        let res = await axios.get(JOKE_API_LINK, {
          headers: { Accept: 'application/json' },
        });
        let joke = res.data.joke;
        if (!this.seenJokes.has(joke)) {
          jokes.push({ id: uuidv4(), text: joke, votes: 0 });
        } else {
          console.log('Duplicated Jokes!!!');
          console.log(joke);
        }
      }
      this.setState(
        (st) => ({
          loading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((joke) =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="fas fa-8x fa-grin-squint fa-spin"></i>
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> jokes
          </h1>
          <img src={Laughing} alt="laughing emoji" />
          <button className="JokeList-getMore" onClick={this.handleClick}>
            New Jokes
          </button>
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
