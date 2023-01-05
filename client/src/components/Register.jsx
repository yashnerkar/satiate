import React, { useState } from "react";

const Register = () => {
  const [organization, setOrganization] = useState({
    name: "",
    email: "",
    phoneNumber: null,
    password: "",
    location: "",
    upiID: "",
  });
  const [alert, setAlert] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({
      ...organization,
      [name]: value,
    });
  };
  const getData = async (e) => {
    e.preventDefault();
    const response = await fetch("/register", {
      method: "POST",
      body: JSON.stringify(organization),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
    });
    const data = await response.json();
    console.log(data);
    setAlert(data.status);
    setTimeout(() => {
      setAlert("");
    }, 3000);
    setOrganization({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      location: "",
      upiID: "",
    });
  };
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", }}>
      {alert !== "" ?
        <div className="d-flex justify-content-center">
          <div className="alert alert-success w-25 text-center" role="alert" style={{ zIndex: 50 }}>
            {alert}</div></div> : null}
      <h2 className="text-center mt-3 text-primary">Register organization</h2>
      <div className="container text-dark d-flex justify-content-center w-50 mt-3">
        <form onSubmit={getData} className="w-75 p-4 rounded-lg mt-1" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              id="exampleInputEmail1"
              name="name"
              value={organization.name}
              placeholder="Enter the organizations name"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={organization.email}
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              name="password"
              value={organization.password}
              placeholder="Enter your Password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="phoneNumber"
              value={organization.phoneNumber}
              placeholder="Enter organization Phone Number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              location
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="location"
              value={organization.location}
              placeholder="Enter the Country"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              UPI ID
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="upiID"
              value={organization.upiID}
              placeholder="Enter organization UPI ID"
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4" name="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default Register;
