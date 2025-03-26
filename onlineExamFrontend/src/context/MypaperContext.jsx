import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const mypaperContextData = createContext(null);

export function MypaperContext({ children }) {
  const [questionPapers, setQuestionPapers] = useState([]);
  const teacherId = sessionStorage.getItem("teacherId");
  const instituteIdPaper = sessionStorage.getItem("instituteIdPaper");
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      if (teacherId != null) {
        try {
          const response = await axios.get(
            `http://localhost:4040/question-papers/teacher/${
              teacherId || instituteIdPaper
            }`
          );
          setQuestionPapers(response.data);
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      }
    };

    fetchQuestionPapers();
  }, [teacherId]);

  useEffect(() => {
    if (myInstituteId) {
      setLoading(true);
      axios
        .get(`http://localhost:4040/institute/getStudents/${myInstituteId}`)
        .then((res) => {
          setStudents(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [myInstituteId]);

  return (
    <mypaperContextData.Provider
      value={{
        questionPapers,
        setQuestionPapers,
        instituteIdPaper,
        students,
        setStudents,
        loading,
      }}
    >
      {children}
    </mypaperContextData.Provider>
  );
}
