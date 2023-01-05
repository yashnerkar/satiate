import React, { useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Geocode from "react-geocode";

import "./style.css";
const Home = () => {
  const [data, setData] = useState({
    country: "",
  });
  const [res, setRes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getData = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await getData.json();
    // console.log(res);
    setRes(res.organizations);
  };
  console.log(res);

  Geocode.setApiKey("AIzaSyA5fNUtp3ZS-83znPjvJ7zWjyj9ed16fSw");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();

  Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <div
      className=""
      style={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: 0,
        margin: 0
      }}
    >
      <Navbar />
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="row mt-3 mb-5">
          {/* map section over */}
          <div

            className="col-md-12 col-sm-12 col-12 text-center d-flex justify-content-center  rounded  mt-5"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label
                    htmlFor="name"
                    className="text-dark"
                    style={{ fontSize: "3rem" }}
                  >
                    Enter Country Name
                  </label>
                </div>
                <div className="d-flex px-2 container w-75 ">
                  <div className="mt-4 d-inline p-2">
                    <input
                      type="text"
                      name="country"
                      value={data.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4 d-inline p-2">
                    <button className="btn btn-sm btn-primary px-4">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <hr className="style-three"></hr>
              <h4 className="text-center">Searched Results</h4>
              <div style={{ height: "300px", overflowY: "scroll", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                {
                  res.map((item, index) => {
                    return <Card key={index} name={item.name} location={item.location} />;
                  })}
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer className="mt-5" />
    </div>
  );
};

export default Home;

{
  /* // // AIzaSyBEOw4-xzGqgKSvxzSYwmKEE_FTDDfPhcw */
}
