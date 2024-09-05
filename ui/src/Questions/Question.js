import React, { useEffect, useState } from "react";
import LLMResponse from "../AskAI/LLMResponse";
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
  const [askAI, setAskAI] = useState(false);
  const [options, setOptions] = useState(prompt.answers);
  const originalOptions = prompt.answers;

  useEffect(() => {
    const shuffledArr = originalOptions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setOptions(shuffledArr);
  }, []);

  useEffect(() => {
    if (showAnswer) {
      setAnswersIndex(getAnswersIndex(correct_response));
      setOptions(originalOptions);
    } else {
      const shuffledArr = originalOptions
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setOptions(shuffledArr);
      setAnswersIndex([]);
    }
  }, [showAnswer]);

  const getAnswersIndex = (response) => {
    const ascii_a = 97;
    const responseIndex = [];
    for (let i = 0; i < response.length; i++) {
      responseIndex.push(Math.abs(ascii_a - response[i].charCodeAt(0)));
    }
    return responseIndex;
  };

  const questionTypeString = {
    "multiple-choice": "Multiple Choice",
    "multi-select": "Multi Select",
  };

  return (
    <div className="question">
      <div>{question_plain}</div>
      {!showAnswer && (
        <div onClick={() => setShowAnswer(true)} className="toggle-answer">
          Show Answer
        </div>
      )}

      {showAnswer && (
        <div onClick={() => setShowAnswer(false)} className="toggle-answer">
          Hide Answer
        </div>
      )}

      <div style={{ fontWeight: "bold" }}>
        Question Type: {questionTypeString[assessment_type]}
      </div>
      <ul>
        {options.map((data, index) => {
          return (
            <li
              className={
                answersIndex.includes(index) ? "correct answer" : "answer"
              }
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
      {showAnswer && !askAI && (
        <>
          <div onClick={() => setAskAI(!askAI)} className="toggle-answer">
            Ask AI
          </div>
        </>
      )}
      {askAI && (
        <>
          <LLMResponse
            question={question_plain + options.join("\n")}
            question_type={questionTypeString[assessment_type]}
            correct_response={correct_response.join(", ")}
            explanation={prompt.explanation}
          />
          <div onClick={() => setAskAI(!askAI)} className="toggle-answer">
            Close
          </div>
        </>
      )}
      {related_lectures.length > 0 && (
        <>Related lectures {related_lectures.map((data) => data)}</>
      )}
    </div>
  );
};

export default Question;
