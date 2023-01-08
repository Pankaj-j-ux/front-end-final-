/** @format */

import { useState } from "react";
import loginImg2 from "../../Assets/Images/login-img2.png";
import loginImg1 from "../../Assets/Images/login-img1.png";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import { useEffect } from "react";
// import { useRef } from "react";
import Loading from "../Landing/Loading";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  // const clearRef = useRef();
  const [isSignUp, setSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    upassword: "",
    cpassword: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const changeHandler = (e) => {
    setData((pre) => {
      if (e.target.name === "cpassword") {
        pre.upassword !== e.target.value
          ? setConfirmPass(false)
          : setConfirmPass(true);
      }
      if (e.target.name === "upassword") {
        pre.cpassword !== e.target.value
          ? setConfirmPass(false)
          : setConfirmPass(true);
      }
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const resetForm = () => {
    document.getElementById("form").reset();
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      upassword: "",
      cpassword: "",
      gender: "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, upassword, cpassword, gender } = data;
    if (isSignUp) {
      // console.log(data);
      if (
        firstname &&
        lastname &&
        email &&
        upassword &&
        cpassword &&
        confirmPass &&
        gender
      ) {
        const response = await fetch("http://localhost:5000/api/v1/signup", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        });

        const result = await response.json();
        if (result.success) {
          alert(result.msg);
          setSignUp(false);
          resetForm();
        } else {
          alert(result.msg);
        }
      } else {
        alert("Please Fill in the Details completely");
      }
    } else {
      // console.log(data);

      if (email && upassword) {
        const response = await fetch("http://localhost:5000/api/v1/login", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        });

        const result = await response.json();

        if (result.success) {
          alert(result.msg);
          navigate("/");
        } else {
          alert(result.msg);
        }
      } else {
        alert("Please Fill in the Details completely");
      }
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="auth">
        <div className="part2">
          <div className="h1">
            <h1>BILL SPLITTER</h1>
            <h3>Dutch your Bill</h3>
          </div>

          <img src={loginImg2} alt="login img2" />
        </div>
        <div className="part1">
          <div className="login-card">
            <form className="form" id="form">
              <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

              {isSignUp && (
                <div className="entry">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    onChange={changeHandler}
                    value={data.firstname}
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    onChange={changeHandler}
                    value={data.lastname}
                  />
                </div>
              )}

              <div className="entry">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={changeHandler}
                  value={data.email}
                />
              </div>

              {isSignUp && (
                <div className="radio">
                  <div>Gender</div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="M"
                      onChange={changeHandler}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="F"
                      onChange={changeHandler}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              )}

              <div className="entry">
                <input
                  type="password"
                  name="upassword"
                  placeholder="Password"
                  onChange={changeHandler}
                  value={data.upassword}
                />
                {isSignUp && (
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={changeHandler}
                    value={data.cpassword}
                  />
                )}
              </div>

              {isSignUp && (
                <span
                  style={{
                    display: "block",
                    color: "red",
                    alignSelf: "flex-end",
                    fontSize: "15px",
                    fontWeight: "500",
                    height: "21px",
                  }}
                >
                  {confirmPass ? "" : "* Confirm Password is not same"}
                </span>
              )}

              {isSignUp ? (
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="button sbutton"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="button sbutton"
                >
                  Login
                </button>
              )}
            </form>

            {isSignUp ? (
              <div className="msg">
                <span>Already have an account?</span>
                <span>
                  <b
                    onClick={() => {
                      resetForm();
                      setSignUp(false);
                    }}
                  >
                    Log in !
                  </b>
                </span>
              </div>
            ) : (
              <div className="msg">
                <span>Don't have an account?</span>
                <span>
                  <b
                    onClick={() => {
                      resetForm();
                      setSignUp(true);
                    }}
                  >
                    Sign Up !
                  </b>
                </span>
              </div>
            )}
          </div>
          {/* <img src={loginImg1} alt="login-img1" /> */}
        </div>
      </div>
    </>
  );
};

export default Auth;
