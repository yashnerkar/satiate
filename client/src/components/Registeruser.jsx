import React, { useState } from "react";

const Registeruser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: 0,
    amountDonated: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const getData = async (e) => {
    e.preventDefault();
    const response = await fetch("/registeruser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setUser({
      name: "",
      email: "",
      phoneNumber: 0,
      amountDonated: 0,
    });
  };
  return (
    <div  style={{ height: "100vh", width: "100vw",overflow:"hidden"}}>
      <h2 className="text-center mt-3">Register User</h2>
      <div className="container bg-dark text-light d-flex justify-content-center w-50 mt-3">
       
        <form onSubmit={getData} className="w-50 p-3 rounded-lg">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name 
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="name"
              value={user.name}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={user.email}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          
          </div>

      <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              amountDonated
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              name="amountDonated"
              value={user.amountDonated}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
           
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              phoneNumber
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="phoneNumber"
              value={user.phoneNumber}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
          <button type="submit" className="btn btn-success"name="submit">
            Register
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registeruser;
