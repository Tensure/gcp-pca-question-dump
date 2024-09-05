import React from "react";
import Question from "./Questions/Question";

import { getAllQuestions } from "./utils";
function App() {
  const questions = getAllQuestions();

  return (
    <div className="container">
      <h1>Professional Cloud Architect exam dump</h1>

      {questions.map((data, index) => (
        <div key={index} className="questions-container">
          <div className="question-index">Question {index + 1}</div>
          <Question {...data} />
        </div>
      ))}
    </div>
  );
}

export default App;
