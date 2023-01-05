import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const __DEV__ = document.domain === "localhost"
// underdevelopment

const Organization = () => {
  const navigate = useNavigate();
  const params = useParams();
  const paramName = params.name;
  console.log(paramName);
  const [user, setUser] = useState({
    name: "",
    email: "",
    amountDonated: 0,
    organization: paramName,
  });
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");
  const [userData, setuserData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };



  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/organizations/:${paramName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const organizationData = await response.json();
      console.log(organizationData);
      setuserData(organizationData.user)
    };
    console.log(userData.length);
    getData();
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/organizations/:${paramName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const temp = await response.json();
    console.log(temp);
  };




  async function displayRazorpay(e) {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const sendData = await fetch("/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const razorpayData = await sendData.json();
    setUser({
      name: "",
      email: "",
      amountDonated: 0,
      organization: paramName,
    });

    const options = {
      key: process.env.REACT_APP_KEY,
      currency: razorpayData.currency,
      amount: razorpayData.amount.toString(),
      order_id: razorpayData.id,
      name: paramName,
      description: "Thank you for your Donation!!!",
      image: "./images/logo.svg",
      handler: function (response) {
        setAlert(razorpayData.status);
        setTimeout(() => {
          setAlert("");
        }, 3000);
        // setAlert(response.status)
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: razorpayData.name,
        email: "yashn0237@gmail.com",
        phone_number: "9898989898",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="row d-flex justify-content-center align-items-center" >
        {alert !== "" ?
          <div className="d-flex justify-content-center">
            <div className="alert alert-success w-25 text-center" role="alert" style={{ zIndex: 50 }}>
              {alert}</div></div> : null}
        <div className="container col-md-6 mt-5">
          <p className="text-center px-5 fw-bold fs-2">Why charity is important for everyone</p>
          <p className="text-center px-5 " style={{
            float: "right",
            fontSize: "1.1rem"
          }}>
            To make the world a better place for everyone, we all need to play our part in whatever way we can. Maybe that’s through volunteering your time or skills for a cause you care about, or perhaps it’s something as simple as being kind to strangers you meet in your day-to-day life. But you can also help make a difference by donating what you can to charity too.
            <img
              className="img-fluid px-5 py-3"
              style={{ float: "right" }}
              src="https://images.unsplash.com/photo-1494832944834-a08818c634b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
              alt="..."
            />

            You might be thinking, why donate to charity? While we like to believe we can make a difference on our own, sometimes we can do more together. The way charities are structured lets them use money raised to directly help people who need it on a larger scale than we can as individuals.
          </p>
        </div>
        {/* img div closed */}
        <div className="col-md-6">
          <div className="container border mt-5 border-white w-75 border-5 text-center">
            <p className="fs-3" style={{}}>Organization - <span className="fw-bold">
              <u>{paramName}</u>
            </span></p>
            <h3>
              <p>
                {userData.length} people have already donated
              </p>
            </h3>
          </div>
          <div className="container d-flex justify-content-center mt-3 mb-5 ">
            <div
              className="card"
              style={{ boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px", width: "25rem" }}
            >
              <div className="card-body text-center">
                <h3 className="card-title">
                  <p>Make a Donation</p>
                </h3>
                <div className="container text-dark d-flex justify-content-center" >
                  <form onSubmit={handleSubmit} className="w-75 rounded-lg" >
                    <div className="mb-1">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        <strong>Name</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control border border-dark"
                        id="exampleInputEmail1"
                        name="name"
                        value={user.name}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-1">
                      <label htmlFor="exampleInputEmail1" className="form-label ">
                        <strong>Email address</strong>
                      </label>
                      <input
                        type="email"
                        className="form-control border border-dark"
                        id="exampleInputEmail1"
                        name="email"
                        value={user.email}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-1">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        <strong>I will donate</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control border border-dark"
                        id="exampleInputEmail1"
                        name="amountDonated"
                        value={user.amountDonated}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
                <a
                  onClick={displayRazorpay}
                  target="_blank"
                  rel="noopener noreferrer"
                  type="submit"
                  className="btn btn-md btn-primary px-5 mt-3"
                  name="submit"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Organization;
