import React, { useEffect, useState } from "react";
import "./Questions.css";

const Question = ({
  question_plain,
  prompt,
  correct_response,
  assessment_type,
  related_lectures,
}) => {
  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const [showAnswer, setShowAnswer] = useState(false);
  const [answersIndex, setAnswersIndex] = useState([]);

  useEffect(() => {
    if (showAnswer) {
      setAnswersIndex(getAnswersIndex(correct_response));
    } else {
      setAnswersIndex([]);
    }
  }, [showAnswer]);

  const getAnswersIndex = (response) => {
    const ascii_a = 97;
    const responseIndex = [];
    for (let i = 0; i < response.length; i++) {
      //   console.log(response[i], response[i].charCodeAt(0));
      responseIndex.push(Math.abs(ascii_a - response[i].charCodeAt(0)));
    }
    return responseIndex;
  };
  //   const answersIndex = getAnswersIndex(correct_response);

  const questionTypeString = {
    "multiple-choice": "Multiple Choice",
    "multi-select": "Multi Select",
  };

  const handleShowAnswerClick = (event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  return (
    <div className="question">
      <div>{question_plain}</div>
      {!showAnswer && (
        <div
          href="#!"
          onClick={(event) => setShowAnswer(true)}
          className="toggle-answer"
        >
          Show Answer
        </div>
      )}

      {showAnswer && (
        <div
          href="#!"
          onClick={(event) => setShowAnswer(false)}
          className="toggle-answer"
        >
          Hide Answer
        </div>
      )}

      <div style={{ fontWeight: "bold" }}>
        Question Type: {questionTypeString[assessment_type]}
      </div>
      <ul>
        {prompt.answers.map((data, index) => {
          return (
            <li
              className={answersIndex.includes(index) ? "correct" : ""}
              key={index}
            >
              {strip(data)}
            </li>
          );
        })}
      </ul>
      {showAnswer && (
        <>
          <div className="explanation">Explanation:</div>
          <div
            dangerouslySetInnerHTML={{ __html: prompt.explanation }}
            className="explanations"
          />
        </>
      )}
      {related_lectures.length > 0 && (
        <>Related lectures {related_lectures.map((data) => data)}</>
      )}
    </div>
  );
};

export default Question;
