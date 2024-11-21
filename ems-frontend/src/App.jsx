import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <HeaderComponent />
        <div className="content">
          <Routes>
            {/* http://localhost:3000 */}
            <Route path="/" element={<ListEmployeeComponent />} />

            {/* http://localhost:3000/employees */}
            <Route path="/employees" element={<ListEmployeeComponent />} />

            {/* http://localhost:3000/add-employee */}
            <Route path="/add-employee" element={<EmployeeComponent />} />

            {/* http://localhost:3000/edit-employee/1 */}
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;