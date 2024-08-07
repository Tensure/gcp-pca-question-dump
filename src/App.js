import Question from "./Questions/Question";
import questions_set_1 from "./quizes/test1.json";
import questions_set_2 from "./quizes/test2.json";
import questions_set_3 from "./quizes/test3.json";
import questions_set_4 from "./quizes/test4.json";
import questions_set_5 from "./quizes/test5.json";
import questions_set_6 from "./quizes/test6.json";
function App() {
  console.log(questions_set_2);
  return (
    <>
      <h1>Professional Cloud Architect exam dump</h1>
      <h1>Set 1</h1>
      {questions_set_1.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
      <h1>Set 2</h1>
      {questions_set_2.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
      <h1>Set 3</h1>
      {questions_set_3.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
      <h1>Set 4</h1>
      {questions_set_4.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
      <h1>Set 5</h1>
      {questions_set_5.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
      <h1>Set 6</h1>
      {questions_set_6.results.map((data, index) => (
        <div key={index}>
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Question {index + 1}
          </div>
          <Question {...data} />
        </div>
      ))}
    </>
  );
}

export default App;
