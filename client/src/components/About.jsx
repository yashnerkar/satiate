import React from "react";

const About = () => {

  return (
    <div style={{
    }}>
      <div className="container-fluid m-0 p-0">
        <div className="text-center container-fluid  d-flex align-items-center justify-content-center" style={{ height: "180px", backgroundColor: "#f5f5f5" }} >
          <p className="animate__animated  animate__backInUp" style={{ fontSize: "4rem" }}>
            About Us
          </p>
        </div>
        {/* dmce logo section */}

        <div className="row mt-5 d-flex justify-content-center ">
          <div className="w-50 animate__animated  animate__backInUp">
            <h2 class="text-center">Who we are?</h2>
            <p className="text-center text-dark fs-3" >
              We are a group of students from the Department of Computer
              Science and Engineering, who are working on a project to make
              a platform for people to make their generous donations towards
              satiating hungers of the needy.
            </p>
          </div>

        </div>
      </div>
    </div>

  );
};

export default About;

/* <p className="text-center">
              We are a group of students from the Department of Computer Science
              and Engineering, who are working on a project to make a platform
              for people to make their generous donations towards satiating hungers of the
              needy.
            </p> */
