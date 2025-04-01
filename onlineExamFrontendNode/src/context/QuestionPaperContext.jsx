import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const questionPaperContextData = createContext(null);

const QuestionPaperContext = ({ children }) => {
  const [institute, setInstitute] = useState([]);
  const studentId = sessionStorage.getItem("studentId");
  const [questionPaperId, setQuestionPaperId] = useState([]);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:7777/student/showInstitute/${studentId}`)
        .then((res) => {
          setInstitute(res.data.institutes || []);
        });
    }
  }, [studentId]);

  return (
    <questionPaperContextData.Provider
      value={{
        questionPaperId,
        setQuestionPaperId,
        setInstitute,
        institute,
      }}
    >
      {children}
    </questionPaperContextData.Provider>
  );
};

export default QuestionPaperContext;
