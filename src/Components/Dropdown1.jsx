/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Dropdown1 = ({ setOverList }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await fetch("http://localhost:5000/api/v1/logout", {
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      navigate("/auth");
    } else {
    }
  };
  return (
    <div>
      <ul
        className="dropdown"
        onMouseEnter={() => {
          setOverList(true);
          console.log("OVER MOUSE");
        }}
        onMouseLeave={() => {
          setOverList(false);

          console.log("NOT OVER MOUSE");
        }}
      >
        <li>
          <Link style={{ color: "black" }} to="/profile">
            <FontAwesomeIcon icon={faGear} /> <span>Profile</span>{" "}
          </Link>
        </li>
        <button onClick={logoutHandler} className="logout-btn">
          Log Out
        </button>
      </ul>
    </div>
  );
};

export default Dropdown1;
