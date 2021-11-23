import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import {randomBadDonger, randomGoodDonger} from "./dongers";
import {permute} from "./func";

const MAX_HEARTS = 4;

const reducer = (state, action) => {
  switch (action.type) {
    case "TICK":
      return { ...state, timer: state.timer + 1 };
    case "ATTEMPT":
      const newState = { ...state, value: "" };
      const correct = action.value === state.question.ans;

      if (correct) {
        newState.reaction = randomGoodDonger();
      } else {
        const newLives = state.lives - 1;
        if (newLives <= 0) {
          newState.reaction = "( ✖ _ ✖ )";
          newState.dead = true;
        } else {
          newState.reaction = randomBadDonger();
        }

        newState.lives = newLives;
      }

      const [next, ...rest] = state.questions;

      if (next === undefined) {
        newState.win = true;
        newState.reaction = correct ? "WIN WIN WIN" : "U SURV1V3D";
      } else {
        newState.question = next;
        newState.questions = rest;
      }

      return newState;
    case "CHANGE":
      return { ...state, value: action.value };
    case "RESTART":
      return init({ numbers: action.numbers, count: action.count });
  }
};

const init = ({ numbers, count }) => {
  const [first, ...rest] = permute(
    numbers.split(",").map((n) => parseInt(n, 10)),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ).slice(0, parseInt(count, 10) || Infinity);

  return {
    question: first,
    questions: rest,
    reaction: "( O‿O )",
    lives: MAX_HEARTS,
    value: "",
    dead: false,
    win: false,
    timer: 0,
    total: rest.length + 1,
  };
};

export function App() {
  const { numbers, count } = useParams();
  const [state, dispatch] = useReducer(reducer, { numbers, count }, init);

  useEffect(() => {
    const id = setInterval(() => {
      if (!state.dead && !state.win) {
        dispatch({ type: "TICK" });
      }
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="container">
      <div className="stats">
        <span className="counter">
          {state.total - state.questions.length}/{state.total}
        </span>
        <span className="timer">
          {new Date(state.timer * 1000).toISOString().substr(11, 8)}
        </span>
      </div>

      <div className="cool-guy-calc">
        <div className="screen">
          <div className="reaction">{state.reaction}</div>
          <div className="lives">
            {Array(MAX_HEARTS)
              .fill(0)
              .map((_, i) =>
                i < state.lives ? (
                  <span key={i}>♥</span>
                ) : (
                  <span key={i} className="depleted">
                    ♥
                  </span>
                )
              )}
          </div>
        </div>
      </div>
      {!state.dead && !state.win && (
        <div className="question-container">
          <div className="question">
            &gt; {state.question.a} {state.question.op} {state.question.b}
          </div>
          <div className="answer">
            &gt;&nbsp;
            <input
              value={state.value}
              onChange={(e) =>
                dispatch({ type: "CHANGE", value: e.target.value })
              }
              onKeyPress={(e) =>
                e.key === "Enter" &&
                dispatch({ type: "ATTEMPT", value: e.target.value })
              }
              autoFocus={true}
            />
          </div>
        </div>
      )}
      {(state.dead || state.win) && (
        <>
          <div className="restart">
            <Link to="/">ᐊ</Link>
          </div>
          <div
            className="restart"
            onClick={() => dispatch({ type: "RESTART", numbers, count })}
          >
            ⟳
          </div>
        </>
      )}
      {state.win && <div className="restart-message">C:&gt; WIN.BAT</div>}
      {state.dead && <div className="restart-message">sudo rm -rf /</div>}
    </div>
  );
}
