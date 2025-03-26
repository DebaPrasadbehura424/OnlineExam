import React, { createContext, useEffect, useState } from "react";

export const questionPaperContextData = createContext(null);

const QuestionPaperContext = ({ children }) => {
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionPaperId, setQuestionPaperId] = useState(null);
  const [institute, setInstitute] = useState([]);
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    const storedQuestionPaperId = sessionStorage.getItem("questionPaperIdx");
    if (storedQuestionPaperId) {
      setQuestionPaperId(storedQuestionPaperId);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!questionPaperId) {
      return;
    }

    setLoading(true);

    fetch(
      `http://localhost:4040/question-papers/questionPaper/${questionPaperId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data from the server");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.questions) {
          setQuestionsToShow(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [questionPaperId]);

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:4040/students/getInstitutes/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setInstitute(data || []);
        });
    }
  }, [studentId]);

  return (
    <questionPaperContextData.Provider
      value={{
        questionsToShow,
        setQuestionPaperId,
        loading,
        setInstitute,
        institute,
      }}
    >
      {children}
    </questionPaperContextData.Provider>
  );
};

export default QuestionPaperContext;
