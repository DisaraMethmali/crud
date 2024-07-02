import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import em1 from '../assets/em1.png';

function UpdateEmployee() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and update state
    axios.get(`http://localhost:5000/getEmployee/${id}`)
      .then(result => {
        console.log(result.data);
        const data = result.data;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/updateEmployee/${id}`, {
      firstName,
      lastName,
      email,
    })
      .then(result => {
        console.log(result);
        navigate('/pages');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={em1} alt="Employee" className="em1" style={{ width: '400px', height: '400px' }} />
        </div>
        <div className="col-md-6">
          <h5 className="mb-4 font-weight-bold">Update Employee</h5>
          <form onSubmit={updateEmployee}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success" style={{ marginTop: '10px' }}>
              {id ? 'Update Employee' : 'Add Employee'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
