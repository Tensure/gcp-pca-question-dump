import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Course from "./pages/Course";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import questions from "./quizzes/gcp_pca.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="gcp_pca"
            element={<Course questions={questions} title="GCP PCA" />}
          />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
