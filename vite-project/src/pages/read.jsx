import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import em1 from "../assets/em1.png";
import "../styles/createEm.css";

function AllEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((result) => {
        console.log(result.data);
        setEmployees(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/pages/updateEmployee/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/deleteEmployee/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    navigate("/pages/createEmployee");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h5 className="mb-4 font-weight-bold">
            Welcome Disara,
          </h5>
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/pages")}
          >
            Close
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h5 className="mb-4 font-weight-bold">Employee</h5>
          <Button
            variant="success"
            onClick={handleClick}
            className="mb-2"
          >
            Add New
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(employee._id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
