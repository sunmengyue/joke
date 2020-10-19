import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-thumbs-up" onClick={this.props.upvote}></i>
          <span>{this.props.votes}</span>
          <i className="fas fa-thumbs-down" onClick={this.props.downvote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
      </div>
    );
  }
}
export default Joke;
