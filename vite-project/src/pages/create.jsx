import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/createEmployee", {
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
          <h5 className="mb-4 font-weight-bold">Add Employee</h5>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
