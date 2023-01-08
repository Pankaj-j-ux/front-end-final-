/** @format */

import { useState } from "react";

const CreateGroupCard = ({ setOpenCreateGroup, setGroupData }) => {
  const [data, setData] = useState("");
  const [disabled, setDisabled] = useState(true);

  const submitHandler = async () => {
    const response = await fetch("http://localhost:5000/api/v1/creategroup", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        gname: data,
      }),
    });

    const result = await response.json();

    if (result.success) {
      //   console.log(result.newgroup);
      setGroupData((pre) => {
        return [...result.newgroup, ...pre];
      });
      setOpenCreateGroup(false);
    } else {
      alert("Something Went wrong !!!");
    }
  };

  return (
    <div className="creategroup_card">
      <div className="innerbody">
        <div
          className="close_btn"
          onClick={() => {
            setOpenCreateGroup(false);
          }}
        >
          X
        </div>
        <div className="title">Create Group</div>
        <div className="body">
          <label htmlFor="groupName">Group Name</label>
          <input
            type="text"
            name="groupName"
            id="groupName"
            placeholder="GOA 2K22"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
              if (e.target.value.length > 4) {
                setDisabled(false);
                document.querySelector(".req-warning").style.opacity = "0";
              } else {
                setDisabled(true);

                document.querySelector(".req-warning").style.opacity = "1";
              }
            }}
          />
          <p className="req-warning">Required *</p>
        </div>
        <button
          disabled={disabled}
          className="create_btn"
          onClick={submitHandler}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupCard;
