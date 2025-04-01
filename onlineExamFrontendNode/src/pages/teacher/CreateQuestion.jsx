import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateQuestion(props) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const selectquestionPaperId = sessionStorage.getItem("questionPaperId");

  const handleQuestionTextChangeBefore = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChangeBefore = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChangeBefore = (e) => {
    setCorrectAnswer(e.target.value.toUpperCase());
  };

  const handleQuestionTextChangeAfter = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChangeAfter = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    updatedQuestions[questionIndex].correctAnswer = "";
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChangeAfter = (e, index) => {
    const updatedQuestions = [...questions];
    const newCorrectAnswer = e.target.value.toUpperCase();
    updatedQuestions[index].correctAnswer = newCorrectAnswer;

    if (["A", "B", "C", "D"].includes(newCorrectAnswer)) {
      setQuestions(updatedQuestions);
    } else {
      if (newCorrectAnswer === "") {
        alert("Please fill in all fields.");
        setQuestions(updatedQuestions);
      } else {
        alert("Invalid Answer! Please provide a valid answer (A, B, C, or D).");
      }
    }
  };

  const handleAddQuestion = () => {
    const optionCorrectAnswer = ["A", "B", "C", "D"].includes(
      correctAnswer.toUpperCase()
    );

    if (questionText && correctAnswer && optionCorrectAnswer) {
      const newQuestion = {
        questionText,
        options,
        correctAnswer,
        questionPaperId: selectquestionPaperId,
      };
      setQuestions([...questions, newQuestion]);
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } else {
      alert(
        "Please complete all fields and make sure the correct answer is in the options list."
      );
    }
  };

  const handleSubmit = async () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const correctAnswerIndex = ["A", "B", "C", "D"].indexOf(
        question.correctAnswer.toUpperCase()
      );

      if (correctAnswerIndex === -1) {
        alert(
          `Question ${
            i + 1
          } has an invalid correct answer. Please use A, B, C, or D.`
        );
        return;
      }

      for (let j = 0; j < 4; j++) {
        if (!question.options[j]) {
          alert(
            `Option ${j + 1} is missing for question ${
              i + 1
            }. Please fill in all options.`
          );
          return;
        }
      }
    }

    try {
      const response = await axios.put(
        "http://localhost:7777/questionPaper/questions",
        questions
      );
      alert("Questions saved successfully.");
    } catch (error) {
      alert("Error submitting questions.");
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 space-y-8">
      <h1 className="text-4xl font-semibold text-center text-gray-800">
        Create Question Paper
      </h1>

      <div className="space-y-6">
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Added Questions
          </h3>

          <ul className="space-y-4">
            {questions.map((question, questionIndex) => (
              <li
                key={questionIndex}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex">
                  <span className="text-gray-600 font-extrabold">
                    {questionIndex + 1}.
                  </span>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionTextChangeAfter(e, questionIndex)
                    }
                    className="w-full font-semibold text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <ul className="ml-6 mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className="text-gray-700 flex items-center"
                    >
                      <span className="text-gray-600 font-extrabold">
                        {String.fromCharCode(65 + optionIndex)}:
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChangeAfter(e, questionIndex, optionIndex)
                        }
                        className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    </li>
                  ))}
                </ul>

                <div className="mt-2 text-green-600">
                  Correct Answer:
                  <input
                    type="text"
                    value={question.correctAnswer.toUpperCase()}
                    onChange={(e) =>
                      handleCorrectAnswerChangeAfter(e, questionIndex)
                    }
                    className="font-semibold"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add question form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Add Question
          </h2>

          {/* Form fields for adding a new question */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <label className="block text-lg font-medium text-gray-700">
              Question Text
            </label>
            <input
              type="text"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={questionText}
              onChange={handleQuestionTextChangeBefore}
              placeholder="Enter the question text"
            />
          </div>

          {/* Options fields */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <label className="block text-lg font-medium text-gray-700">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4 mb-3">
                <input
                  type="text"
                  className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={option}
                  onChange={(e) =>
                    handleOptionChangeBefore(index, e.target.value)
                  }
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                />
                <span className="text-gray-700 font-extrabold">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
            ))}
          </div>

          {/* Correct answer field */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <label className="block text-lg font-medium text-gray-700">
              Correct Answer
            </label>
            <input
              type="text"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={correctAnswer.toUpperCase()}
              onChange={handleCorrectAnswerChangeBefore}
              placeholder="Enter the correct answer (A, B, C, or D)"
            />
          </div>

          {/* Add question button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleAddQuestion}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Add Question
            </button>
          </div>

          {/* Submit questions button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
              disabled={questions.length === 0}
            >
              Submit All Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
