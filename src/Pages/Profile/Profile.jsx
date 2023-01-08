/**
 * @format
 */

import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import Loading from "../Landing/Loading";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenCanvas, setIsOpenCanvas] = useState(false);
  const [profileData, setProfileData] = useState({});
  // const [profileData, setProfileData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      const response = await fetch("http://localhost:5000/api/v1/getprofile", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!result.success) {
        setProfileData(null);
        setIsLoading(false);
      } else {
        setProfileData(result.user);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const changeHandler = (e) => {
    setProfileData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const saveHandler = () => {
    console.log(profileData);
    setIsUpdate(false);
  };

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

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div
        className="imagecanvas"
        style={{ marginTop: isOpenCanvas ? "100vh" : "0vh" }}
      ></div>
      <div className="mainprofile">
        <div className="nav">
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/auth">Sign In</Link>
            </li>
            <li onClick={logoutHandler}>
              <FontAwesomeIcon icon={faPowerOff} />
            </li>
          </ul>
        </div>
        <div className="mainprofile_inner">
          <div className="photo">
            {profileData.photo1 ? (
              <>
                <div className="DP">
                  <img src={profileData.photo1} alt="profile_picture" />
                </div>
              </>
            ) : (
              <>
                <div className="DP">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </>
            )}
            <p>Update Profile Picture</p>
          </div>
          <div className="detail">
            <div>
              <p>Public Profile</p>
              <p>Add information about yourself</p>
            </div>
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                onChange={changeHandler}
                disabled={!isUpdate}
                type="text"
                id="uname"
                name="uname"
                value={profileData.uname}
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={changeHandler}
                disabled={!isUpdate}
                type="text"
                id="email"
                name="email"
                value={profileData.email}
              />
              <label htmlFor="contact">Mobile Number</label>
              <input
                onChange={changeHandler}
                disabled={!isUpdate}
                type="number"
                id="contact"
                name="contact"
                value={profileData.contact}
              />
              {/* <label htmlFor="password"></label> */}
              {/* <input disabled={!isUpdate} type="text" id="password" /> */}

              {isUpdate ? (
                <button onClick={saveHandler}>Save</button>
              ) : (
                <button
                  onClick={() => {
                    setIsUpdate(true);
                  }}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
