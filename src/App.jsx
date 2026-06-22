import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "./student";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        

        <Route
          path="/:referralCode"
          element={<StudentForm />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;