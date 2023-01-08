/** @format */

import { useState } from "react";
import MemberCard from "./MemberCard";

const GroupMemberCard = ({
  gid,
  profileData,
  groupInfo,
  groupMembers,
  setGroupMembers,
  setOpenGroupMemberCard,
  onMemberAdd,
}) => {
  const [formData, setFormData] = useState("");

  const submitHandler = async () => {
    document.querySelector(".addmember-btn").innerHTML = "ADDING ...";
    const response = await fetch(
      `http://localhost:5000/api/v1/addmember/${gid}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          newuser: formData,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      let uid = result.newmember.id;
      setGroupMembers((pre) => {
        return [{ ...result.newmember, uid }, ...pre];
      });

      onMemberAdd();
      document.querySelector(".addmember-btn").innerHTML = "ADD";

      // setOpenCreateGroup(false);
    } else {
      document.querySelector(".addmember-btn").innerHTML = "ADD";
      alert("Something went wrong");
    }
  };

  return (
    <div className="groupMemberCard">
      <div className="innerbody">
        <div
          className="close_btn"
          onClick={() => setOpenGroupMemberCard((pre) => !pre)}
        >
          X
        </div>
        <div className="uppersection">
          <div className="title">
            <span>Group Members </span>
          </div>

          {profileData.id === groupInfo.admin1 ? (
            <div className="subbody">
              <input
                type="text"
                name="newuser"
                id="newuser"
                value={formData}
                placeholder="Add New Member"
                onChange={(e) => {
                  setFormData(e.target.value);
                }}
              />
              <button className="addmember-btn" onClick={submitHandler}>
                ADD
              </button>
            </div>
          ) : (
            <p
              style={{
                color: "red",
                width: "100%",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              *Only Group Admin can add the Members
            </p>
          )}
        </div>
        <div className="lowersection">
          <div className="body">
            {groupMembers.map((current, index) => {
              return (
                <MemberCard
                  key={index}
                  profileData={profileData}
                  groupInfo={groupInfo}
                  membername={current.uname}
                  memberid={current.uid}
                  memberemail={current.email}
                  membercontact={current.contact}
                  photo={current.photo1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberCard;
