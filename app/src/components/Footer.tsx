import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-800 text-gray-400 text-sm leading-8 mt-5 p-4 w-full">
        <div className="container mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <p className="text-center md:text-left p-2">
              &copy; 2021 All Rights Reserved by{" "}
              <a
                href="/"
                className="text-gray-400 hover:text-blue-600"
                aria-label="Sudipta's Homepage"
              >
                Sudipta
              </a>
              .
            </p>
            <ul className="flex space-x-3 mt-2 md:mt-0">
              <li>
                <a
                  className="bg-gray-700 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors duration-200"
                  href="/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  className="bg-gray-700 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-400 transition-colors duration-200"
                  href="https://x.com/Sudipta_678"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </li>
              
              <li>
                <a
                  className="bg-gray-700 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-800 transition-colors duration-200"
                  href="www.linkedin.com/in/sudipta-mondal-47b583201"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
