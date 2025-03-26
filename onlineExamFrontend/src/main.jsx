import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import QuestionPaperContext from "./context/QuestionPaperContext.jsx";
import { MypaperContext } from "./context/MypaperContext.jsx";

createRoot(document.getElementById("root")).render(
  <MypaperContext>
    <QuestionPaperContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QuestionPaperContext>
  </MypaperContext>
);
