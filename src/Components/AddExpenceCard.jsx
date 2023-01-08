/** @format */

import { useState } from "react";
import CheckMemberCard from "./CheckMemberCard";

const AddExpenceCard = ({
  gid,
  groupMembers,
  setOpenAppExpenceCard,
  onExpenseAdd,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    member_include: [],
  });

  const changeHandler = (e) => {
    if (e.target.name === "member_include") {
      if (e.target.checked) {
        formData.member_include.push(+e.target.value);
      } else {
        formData.member_include = formData.member_include.filter(function (
          item
        ) {
          return item !== +e.target.value;
        });
      }
    } else if (e.target.name === "amount") {
      setFormData((pre) => {
        return { ...pre, [e.target.name]: +e.target.value };
      });
    } else {
      setFormData((pre) => {
        return { ...pre, [e.target.name]: e.target.value };
      });
    }

    console.log(formData);
  };

  const submitHandler = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/addexpense/${gid}`,
      {
        credentials: "include",
        method: "POST",
        mode: "cors",
        cache: "no-cache",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (result.success) {
      onExpenseAdd(formData.amount, result.newBill, formData.member_include);
      setOpenAppExpenceCard(false);
    } else {
      alert("Something went wrong :(");
    }
  };

  return (
    <div className="addexpencecard">
      <div className="innerbody">
        <div
          className="close_btn"
          onClick={() => {
            setOpenAppExpenceCard(false);
          }}
        >
          X
        </div>

        <div className="uppersection">
          <div className="title">
            <span>Expense Detail</span>
          </div>
        </div>

        <div className="slidepanel">
          <form
            id="expense-form"
            className="expense-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              placeholder="Category"
              onChange={changeHandler}
            />

            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              placeholder="Description"
              onChange={changeHandler}
            />

            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              placeholder="Amount"
              onChange={changeHandler}
            />
            <div className="includemember">
              <div className="members">
                {groupMembers.map((curr, index) => {
                  return (
                    <CheckMemberCard
                      key={index}
                      changeHandler={changeHandler}
                      // profileData={profileData}
                      // groupInfo={groupInfo}
                      membername={curr.uname}
                      memberid={curr.uid}
                      memberemail={curr.email}
                      membercontact={curr.contact}
                      photo={curr.photo1}
                    />
                  );
                })}
              </div>
            </div>

            <div className="btn-group">
              <button className="expense-btn" onClick={submitHandler}>
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpenceCard;
