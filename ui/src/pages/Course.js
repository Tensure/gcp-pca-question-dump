import { Button, Flex, Modal, Pagination, Typography } from "antd";
import React, { useState } from "react";
import Question from "../components/Questions/Question";

/**
 * Renders a component that displays a course with a title and a list of questions.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the course.
 * @param {array} props.questions - An array of question objects.
 * @return {JSX.Element} The rendered course component.
 */
const Course = ({ questions, title }) => {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Title } = Typography;
  const [questionsToShow, setQuestionsToShow] = useState(
    questions.slice(0, 10)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onPaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    setQuestionsToShow(questions.slice((page - 1) * pageSize, page * pageSize));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container">
        <Title>{title}</Title>
        <Flex gap={10}>
          <Button onClick={() => setShowAllQuestions(!showAllQuestions)}>
            {showAllQuestions ? "Hide All Questions" : "Show all questions"}
          </Button>
          <Button disabled={showAllQuestions} onClick={showModal}>
            Take a test
          </Button>
        </Flex>

        {showAllQuestions && (
          <>
            {questionsToShow.map((data, index) => (
              <Question
                {...data}
                question_index={index + (currentPage - 1) * pageSize}
              />
            ))}
            <Pagination
              showSizeChanger
              hideOnSinglePage={true}
              onChange={onPaginationChange}
              total={questions.length}
            />
          </>
        )}

        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </div>
  );
};

export default Course;
