import { Button, Collapse, Flex, Typography } from "antd";
import React, { useEffect, useState } from "react";
import LLMResponse from "../AskAI/LLMResponse";

import "./Questions.css";

const Question = ({
  question_index,
  question_plain,
  prompt,
  answers,
  explanation,
  correct_response,
  assessment_type,
  related_lectures,
}) => {
  const strip = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const { Paragraph, Title, Text } = Typography;

  const [showAnswer, setShowAnswer] = useState(false);
  const [answersIndex, setAnswersIndex] = useState([]);
  const [askAI, setAskAI] = useState(false);
  const [options, setOptions] = useState(answers);
  const originalOptions = answers;

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
      setAskAI(false);
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
    <div className="question" key={question_index}>
      <Flex gap={10} alignitems="center" justify="space-between">
        <Text style={{ fontSize: "18px" }}>
          {question_index + 1}. {question_plain}
        </Text>
        <Button
          onClick={() => {
            setShowAnswer(!showAnswer);
          }}
        >
          {showAnswer ? <div>Hide Answer</div> : <div>Show Answer</div>}
        </Button>
      </Flex>

      <Paragraph style={{ fontWeight: "bold", fontSize: "16px" }}>
        Question Type: {questionTypeString[assessment_type]}
      </Paragraph>
      <Paragraph style={{ fontSize: "16px" }}>
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
      </Paragraph>

      {showAnswer && (
        <>
          <Collapse
            size="small"
            items={[
              {
                key: "1",
                label: "Explanation",
                children: (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: explanation }}
                      className="explanations"
                    />
                    {!askAI && (
                      <Button onClick={() => setAskAI(!askAI)}>Ask AI</Button>
                    )}
                    {askAI && (
                      <>
                        <LLMResponse
                          question={question_plain + options.join("\n")}
                          question_type={questionTypeString[assessment_type]}
                          correct_response={correct_response.join(", ")}
                          explanation={explanation}
                        />
                      </>
                    )}
                  </>
                ),
              },
            ]}
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
