import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    console.log(id);
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center display-5">Çalışan Listesi</h2>
      <button
        type="button"
        className="btn btn-outline-success"
        onClick={addNewEmployee}
      >
        Çalışan Ekle
      </button>
      <br /> <br />
      <table className="table table-responsive table-bordered ">
        <thead className="table-light">
          <tr>
            <th>Çalışan id</th>
            <th>Çalışan Adı</th>
            <th>Çalışan Soyadı</th>
            <th>Çalışan email adresi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <div
                  style={{ display: "flex", gap: "10px", textAlign: "center" }}
                >
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Güncelle
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeEmployee(employee.id)}
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;
