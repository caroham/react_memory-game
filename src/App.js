import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      board: [
        {}, {}, {}, {},
        {}, {}, {}, {},
        {}, {}, {}, {}
      ],
      colors: ['green', 'red', 'yellow', 'pink', 'blue', 'orange'],
      count: 0,
      lastIdx: false,
      prevIdx: false,
      waiting: false,
      message: '',
      score: 0,
      win: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

componentDidMount() {
  this.generateBoard();
}

handleClick(i) {
  const board = this.state.board;
  if(board[i].locked || this.state.waiting) {
    return;
  }
  let count = this.state.count;
  let prevIdx = this.state.prevIdx;
  let lastIdx = this.state.lastIdx;
  if(i === lastIdx && lastIdx) {
    board[i].revealed = false;
    if(count > 0){
      count--;
    }
  } else {
    count++;
    board[i].revealed = true;
    if(count >= 2){
      if(board[i].color === board[lastIdx].color) {
        this.setState({waiting: true});
        board[i]['locked'] = true;
        board[lastIdx]['locked'] = true;
        let score = this.state.score+1;
        if(score >= 6) {
          this.setState({win: true, message: 'Congrats! You won!'});
        } else {
          this.setState({message: "Yay! You found a pair!", waiting: true});
          setTimeout( () => {
            this.setState({message: '', waiting: false});
          }, 1000);
        }
        this.setState({score});
      } else {
        this.setState({message: "Not a pair! Try to remember the colors.", waiting: true});
        setTimeout( () => {
          board[i].revealed = false;
          board[lastIdx].revealed = false;
          lastIdx = false;
          prevIdx = false;
          this.setState({board, prevIdx, lastIdx, waiting: false, message:''});
        }, 1000);
      }
      count = 0;
    } else {
      prevIdx = lastIdx;
      lastIdx = i;
    }
  }
  this.setState({board, count, prevIdx, lastIdx});
}

generateBoard() {
  let colorArr = [...this.state.colors, ...this.state.colors];
  let board = this.state.board.slice();
  board.map((tile, idx) => {
    tile['revealed'] = false;
    tile['locked'] = false;
    let colorIdx = Math.floor(Math.random()*colorArr.length);
    let tileColor = colorArr[colorIdx];
    colorArr.splice(colorIdx, 1);
    tile['color']=tileColor;
  });
  this.setState({board});
}

reset() {
  this.setState({
    board: [
      {}, {}, {}, {},
      {}, {}, {}, {},
      {}, {}, {}, {}
    ],
    count: 0,
    lastIdx: false,
    prevIdx: false,
    waiting: false,
    message: '',
    score: 0,
    win: false
  });
  this.generateBoard();
}

render() {
  let tileBoard = this.state.board.map((tile, idx) => {
    return (
      <Tile key={idx} idx={idx} color={tile.color} revealed={tile.revealed} handleClick={this.handleClick}/>
    )}
  );
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Match squares with the same color.</p>
      <h3 id="score">score: {this.state.score}</h3>
      <div className="board">{tileBoard}</div>
      <p>{this.state.message}</p>
      <button style={{visibility: this.state.win ? 'visible' : 'hidden'}} onClick={() => this.reset()}>Reset</button>
    </div>
  );
}
}

export default App;

