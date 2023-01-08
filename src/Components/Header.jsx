/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faGear,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";

const Header = ({
  setIsExtendedSidebar,
  setOverProfile,
  profileData,
  isTrigged,
}) => {
  return (
    <>
      <div className="header">
        <div className="logo">
          {!isTrigged && (
            <FontAwesomeIcon
              icon={faBars}
              onClick={() =>
                setIsExtendedSidebar((pre) => {
                  return !pre;
                })
              }
            />
          )}
          <Link to="/">BILL SPLITTER</Link>
        </div>
        <div className="setting">
          {/* <div className="features">
            <div className="notification">
              <p>1</p>
              <FontAwesomeIcon icon={faBell} />
            </div>
          </div> */}

          <div
            className="profile"
            onMouseEnter={() => {
              setOverProfile(true);
            }}
            onMouseLeave={() => {
              setOverProfile(false);
            }}
          >
            <span>Hi, {profileData.uname}</span>
            {profileData.photo1 ? (
              <div className="DP">
                <img src={profileData.photo1} alt="DP" />
              </div>
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
