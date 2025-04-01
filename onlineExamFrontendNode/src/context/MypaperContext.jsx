import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const mypaperContextData = createContext(null);

export function MypaperContext({ children }) {
  const [questionPapers, setQuestionPapers] = useState([]);
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("token");
  const teacherId = sessionStorage.getItem("teacherId");
  const institutePaperId = sessionStorage.getItem("institutePaperId");
  const myInstituteId = sessionStorage.getItem("myInstituteId");
  const [myInstituteData, setMyInstituteData] = useState(null);
  useEffect(() => {
    const fetchTeacherId = async () => {
      if (token != null && teacherId != null) {
        try {
          const response = await axios.get(
            "https://online-exam-backendnode.vercel.app/teacher/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            sessionStorage.setItem("myInstituteId", response.data.myInstitute);
            sessionStorage.setItem("teacherId", response.data._id);
          }
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      }
    };
    fetchTeacherId();
  }, []);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      if (teacherId != null) {
        try {
          const response = await axios.get(
            `https://online-exam-backendnode.vercel.app/teacher/questionPaperCreatedByTeacher/${teacherId}`
          );

          setQuestionPapers(response.data.questionPapers);
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      }
    };

    fetchQuestionPapers();
  }, [teacherId]);

  useEffect(() => {
    const teacherId = sessionStorage.getItem("teacherId");
    if (teacherId) {
      const fetchQuestionPapers = async () => {
        try {
          const response = await axios.get(
            `https://online-exam-backendnode.vercel.app/teacher/questionPaperCreatedByTeacher/${teacherId}`
          );
          setQuestionPapers(response.data.questionPapers);
        } catch (error) {
          console.error("Error fetching question papers:", error);
        }
      };
      fetchQuestionPapers();
    }
  }, []);

  const [loading, setLoading] = useState(true);
  //works properly done
  useEffect(() => {
    if (myInstituteId) {
      setLoading(true);
      axios
        .get(
          `https://online-exam-backendnode.vercel.app/institute/showMyInsitute/${teacherId}`
        )
        .then((response) => {
          const institute = response.data;
          setMyInstituteData(institute);
          setStudent(institute.students);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [myInstituteId, teacherId]);

  return (
    <mypaperContextData.Provider
      value={{
        questionPapers,
        setQuestionPapers,
        institutePaperId,
        student,
        setStudent,
        loading,
        setLoading,
        myInstituteData,
        setMyInstituteData,
      }}
    >
      {children}
    </mypaperContextData.Provider>
  );
}

export { mypaperContextData };
