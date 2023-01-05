import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-light text-center ">
        {/* Grid container */}
        <div className="container p-4">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Instagram */}
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="https://www.instagram.com/dmce_csi_catt/"
              role="button"
            >
              <i className="fab fa-instagram" />
            </a>
            {/* Linkedin */}
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/company/csi-dmce/about/"
              role="button"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            {/* Github */}
            <a
              className="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/CSI-CATT-DMCE"
              role="button"
            >
              <i className="fab fa-github" />
            </a>
          </section>
         
          <section className="mb-4">
           <p className="text-center text-dark">
                  We are a group of students from the Department of Computer
                  Science and Engineering, who are working on a project to make
                  a platform for people to make their generous donations towards
                  satiating hungers of the needy.
                </p>
          </section>

        </div>
      
      </footer>
    </div>
  );
};

export default Footer;
