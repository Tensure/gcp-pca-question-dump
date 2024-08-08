import React from "react";
import Question from "./Questions/Question";

import { getAllQuestions } from "./utils";
function App() {
  const questions = getAllQuestions();

  return (
    <React.Fragment>
      <h1>Professional Cloud Architect exam dump</h1>

      {questions.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
    </React.Fragment>
  );
}

export default App;
