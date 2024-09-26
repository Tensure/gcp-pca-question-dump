import { Button, Flex, Modal, Pagination, Select, Typography } from "antd";
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
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [showTest, setShowTest] = useState(false);
  const [testQuestionsSize, setTestQuestionsSize] = useState(10);

  const { Text } = Typography;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectChange = (value) => {};

  const onPaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentPageSize(currentPageSize);
    setQuestionsToShow(questions.slice((page - 1) * pageSize, page * pageSize));
  };

  const handleOk = () => {
    setShowTest(true);
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
          <Button
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            disabled={showTest}
          >
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
                question_index={index + (currentPage - 1) * currentPageSize}
              />
            ))}
            <Pagination
              showSizeChanger
              hideOnSinglePage={true}
              current={currentPage}
              pageSize={currentPageSize}
              onChange={onPaginationChange}
              total={questions.length}
            />
          </>
        )}
        {showTest && (
          <Flex align="center" justifyContent="center" gap={10}>
            This is still work in progress... Come back soon...
            <Button onClick={() => setShowTest(false)}>Stop test</Button>
          </Flex>
        )}

        <Modal
          title="Choose the number of questions you want to take"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Flex vertical>
            <Text>Test Name: {title}</Text>
            <Select
              placeholder="Number of questions"
              onChange={handleSelectChange}
              allowClear={true}
              style={{ width: 200 }}
              size={"large"}
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "30", label: "30" },
                { value: "40", label: "40" },
                { value: "50", label: "50" },
                { value: "60", label: "60" },
              ]}
            />
          </Flex>
        </Modal>
      </div>
    </div>
  );
};

export default Course;
