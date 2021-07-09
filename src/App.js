import { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameover] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameover(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);
  console.log(isGameOver);
  return (
    <>
      <div className="container">
        {!isGameOver && (
          <button style={{ margin: "3px", color: "black" }} onClick={resetGame}>
            <span className="vertical-text">restart</span>
          </button>
        )}
        {isGameOver && (
          <h2 className="vertical-text">
            GAME OVER
            <button onClick={resetGame}>
              <span className="vertical-text">NEW GAME</span>
            </button>
          </h2>
        )}
        <div className="board-container">
          <Board board={board} turn={turn} />
        </div>
        {result && <p className="vertical-text">{result}</p>}
      </div>
    </>
  );
}

export default App;
