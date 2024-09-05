import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const serverBaseURL = "http://localhost:5000";

const LLMResponse = ({
  question,
  correct_response,
  question_type,
  explanation,
}) => {
  const [data, setData] = useState("");
  const hasFetchedRef = useRef(false);

  const prompt = `I am preparing for the Google Cloud Professional Architect exam. 
        You are a Google cloud engineer.
        I am given the below ${question_type} question: ${question}. 
        Correct response is ${correct_response}. 
        Please provide detailed explanation with examples why that is the correct response. 
        Also provide explanation why you did not choose other options.
        
        Please have this additional explanation to aid you in providing me the answer.
        ${explanation}

        Provide the response in markdown format.
        `;

  useEffect(() => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${serverBaseURL}/api/llama`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 3) {
        const response = xhr.responseText;
        setData(response);
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Streaming complete");
      } else {
        console.error("Error:", xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error("Request failed");
    };

    xhr.send(JSON.stringify({ prompt: prompt }));
  }, [prompt]);
  return (
    <div>
      <h1>LLM Response</h1>
      {data.length === 0 && <p>Loading...</p>}
      <ReactMarkdown
        children={data}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                children={children.replace(/\n$/, "")}
                style={dark}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default LLMResponse;
