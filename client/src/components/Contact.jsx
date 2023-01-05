import React, { useState } from "react";

const About = () => {
  const [contact, setContact] = useState({
    email: "",
    text: ""
  })

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact)
  }


  return (
    <div>
      <div className="container-fluid m-0 p-0">
        <div className="text-center container-fluid  d-flex align-items-center justify-content-center" style={{ height: "180px", backgroundColor: "#f5f5f5" }} >
          <p className="animate__animated  animate__backInUp" style={{ fontSize: "3rem" }}>
            Contact Us
          </p>
        </div>
        {/* dmce logo section */}

        <div className="row mt-5 ">
          <div className="col-md-6 col-12  d-flex justify-content-center align-items-center">
            <div className="w-75 animate__animated  animate__backInUp p-4" style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px" }}>
              <h2 class="text-center ">Who we are?</h2>
              <p className="text-center text-dark fs-4 mt-5" >
                We are a group of students from the Department of Computer
                Science and Engineering, who are working on a project to make
                a platform for people to make their generous donations towards
                satiating hungers of the needy.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div className="w-50 animate__animated  animate__backInUp">
              <form onSubmit={handleSubmit} className=" rounded-lg p-5" style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px" }} >

                <div className="mb-1">
                  <label htmlFor="exampleInputEmail1" className="form-label ">
                    <strong>Email address</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control border border-dark"
                    id="exampleInputEmail1"
                    name="email"
                    value={contact.email}
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <strong>Feedback</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-dark"
                    id="exampleInputEmail1"
                    name="amountDonated"
                    value={contact.text}
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary mt-3 ">
                  SEND FEEDBACK
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default About;

