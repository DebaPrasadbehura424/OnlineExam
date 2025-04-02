import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const questionPaperContextData = createContext(null);

const QuestionPaperContext = ({ children }) => {
  const [institute, setInstitute] = useState([]);
  const studentId = sessionStorage.getItem("studentId");
  const [questionPaperId, setQuestionPaperId] = useState([]);

  // const backednUrl = "http://localhost:7777";
  const backednUrl = "https://online-exam-backendnode.vercel.app";


  useEffect(() => {
    if (studentId) {
      axios
        .get(`${backednUrl}/student/showInstitute/${studentId}`)
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
