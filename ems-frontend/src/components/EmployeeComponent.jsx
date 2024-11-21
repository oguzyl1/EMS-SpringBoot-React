import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      if (id) {
        // Eğer id varsa, güncelleme işlemi yapıyoruz
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Eğer id yoksa, yeni bir çalışan ekliyoruz
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Hata oluştu:", error);
          });
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "Ad boş bırakılamaz!!";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Soyad boş bırakılamaz!!";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email boş bırakılamaz!!";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Çalışan Güncelle</h2>;
    } else {
      return <h2 className="text-center">Çalışan Ekle</h2>;
    }
  };

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 ">
          <br />
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Çalışan Adı:</label>
                <input
                  type="text"
                  placeholder="Çalışanın adını girin"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Çalışan Soyadı:</label>
                <input
                  type="text"
                  placeholder="Çalışanın soyadını girin"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Çalışan Email Adresi:</label>
                <input
                  type="text"
                  placeholder="Çalışanın email adresini girin"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Çalışan Ekle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
