import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const questionPaperContextData = createContext(null);

const QuestionPaperContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questionPaperId, setQuestionPaperId] = useState(null);
  const [institute, setInstitute] = useState([]);
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (sessionStorage.getItem("questionPaperIdx")) {
      setQuestionPaperId(sessionStorage.getItem("questionPaperIdx"));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:4040/students/getInstitutes/${studentId}`)
        .then((res) => {
          setInstitute(res.data || []);
        });
    }
  }, [studentId]);

  return (
    <questionPaperContextData.Provider
      value={{
        questionPaperId,
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
