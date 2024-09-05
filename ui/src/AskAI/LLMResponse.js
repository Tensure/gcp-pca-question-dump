import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const serverBaseURL = "http://localhost:5000";

const LLMResponse = ({ question }) => {
  const [data, setData] = useState("");
  const hasFetchedRef = useRef(false);

  const prompt = `I am preparing for the Google Cloud Professional Architect exam. 
        You are a Google cloud engineer.
        I am given the below question. ${question} Pick the correct option. 
        Please provide detailed explanation with examples for choosing that option. 
        Also provide explanation why you did not choose other options.`;

  useEffect(() => {
    if (hasFetchedRef.current) return; // If API has been called, skip the effect

    hasFetchedRef.current = true;
    fetch(`${serverBaseURL}/api/llama`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => {
        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let receivedLength = 0;

          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  receivedLength += value.length;
                  const chunk = decoder.decode(value, { stream: true });
                  setData((prev) => prev + chunk);
                  controller.enqueue(value);
                  push();
                });
              }
              push();
            },
          });
        }
      })
      .then((stream) => new Response(stream))
      .then((response) => response.text())
      .then((data) => {
        console.log("Streaming complete");
      })
      .catch((error) => {
        console.error("Streaming error:", error);
      });
  }, [prompt]);
  return (
    <div>
      <h1>LLM Response</h1>
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
