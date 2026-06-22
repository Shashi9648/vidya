import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./student";
import SharePage from "./SharePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharePage />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/student-form/:referralCode" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;