/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import GroupExpand from "../../Components/GroupExpand";
import CreateGroupCard from "../../Components/CreateGroupCard";
import Loading from "../Landing/Loading";
import Dropdown1 from "../../Components/Dropdown1";
import ProfileUpdateBox from "../../Components/ProfileUpdateBox";

const Dashboard = () => {
  const [groupData, setGroupData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileAlert, setProfileAlert] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  // const [openProfileUpdate, setProfileUpdate] = useState();

  const [isExtendedSidebar, setIsExtendedSidebar] = useState(true);

  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [isOverProfile, setOverProfile] = useState(false);
  const [isOverList, setOverList] = useState(false);
  const [isTrigged, setIsTrigged] = useState(false);
  const [isSlider, setIsSlider] = useState(false);

  function setSliderHandler(val) {
    setIsSlider(val);
  }

  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }

  useEffect(() => {
    function handleWindowResize() {
      if (getWindowSize() <= 610) {
        // console.log("bellow");
        setIsTrigged(true);
      } else {
        // console.log("above");

        setIsTrigged(false);
      }
    }

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("load", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (isOverList || isOverProfile) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOverList, isOverProfile]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/api/v1/dashboard", {
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
        setIsLoading(false);
        setGroupData(null);
        setProfileData(null);
      } else {
        console.log("phle");
        setIsLoading(false);
        console.log("phle1");
        setGroupData(result.groups.reverse());
        console.log("phle2");
        setProfileData(result.user);
        console.log("phle3");
        console.log(result.user);
      }
    }
    fetchData();
  }, []);

  if (isLoading && !groupData) {
    return <Loading />;
  }

  if (!groupData && !isLoading) {
    navigate("/auth");
  }

  // if (profileData.photo && profileData.contact) {
  //   setProfileAlert(false);
  // }

  return (
    <>
      <div className="dashboard">
        {profileAlert && (
          <ProfileUpdateBox
            setProfileAlert={setProfileAlert}
            profileData={profileData}
          />
        )}
        {isOpen && <Dropdown1 setOverList={setOverList} />}

        {openCreateGroup && (
          <CreateGroupCard
            setOpenCreateGroup={setOpenCreateGroup}
            setGroupData={setGroupData}
          />
        )}

        {/* {!(profileData.photo1 && profileData.contact) && (
          <div className="banner">
            <p>Complete Your Profile first</p>
          </div>
        )} */}
        <Header
          isTrigged={isTrigged}
          profileData={profileData}
          setIsExtendedSidebar={setIsExtendedSidebar}
          setOverProfile={setOverProfile}
        />
        <div className="slider">
          <div className="dashboard-body">
            <Sidebar
              isTrigged={isTrigged}
              profileData={profileData}
              isExtendedSidebar={isExtendedSidebar}
              setOpenCreateGroup={setOpenCreateGroup}
              groupData={groupData}
              setSliderHandler={setSliderHandler}
              isSlider={isSlider}
            />
            <GroupExpand
              isTrigged={isTrigged}
              isExtendedSidebar={isExtendedSidebar}
              profileData={profileData}
              groupData={groupData}
              setSliderHandler={setSliderHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
