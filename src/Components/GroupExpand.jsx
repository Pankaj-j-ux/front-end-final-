/** @format */
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import GroupMemberCard from "./GroupMemberCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPeopleRoof,
  faLayerGroup,
  faEdit,
  faArrowUpRightFromSquare,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import AddExpenceCard from "./AddExpenceCard";
import ExpenseCard from "./ExpenseCard";
import HistoryCard from "./HistoryCard";
import OweCard from "./OweCard";
import LentCard from "./LentCard";
import DeleteGroupCard from "./DeleteGroupCard";
import Loader from "./Loader";

const GroupExpand = ({
  groupData,
  profileData,
  isExtendedSidebar,
  isTrigged,
  setSliderHandler,
}) => {
  // const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [groupInfo, setGroupInfo] = useState({});
  const [groupMembers, setGroupMembers] = useState([]);
  const [noOfMembers, setNoOfMembers] = useState();
  const [noOfBills, setNoOfBills] = useState();
  const [billHistory, setBillHistory] = useState([]);
  const [oweData, setOweData] = useState([]);
  const [lentData, setLentData] = useState([]);
  const [expense, setExpense] = useState({});
  const [totalExpense, setTotalExpense] = useState("");

  const [openGroupMemberCard, setOpenGroupMemberCard] = useState(false);
  const [openAddExpenceCard, setOpenAppExpenceCard] = useState(false);

  const { gid } = useParams();

  const changeGroupName = async () => {
    const response = await fetch(
      `http://localhost:5000/api/v1/changegroupname/${gid}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: groupName,
        }),
      }
    );
    const result = await response.json();

    if (result.success) {
    } else {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const apicall = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/dashboard/${gid}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.success === true) {
        setGroupName(result.group[0].gname);
        setGroupInfo(result.group[0]);
        setGroupMembers(result.groupMembers);
        setNoOfMembers(result.groupMembers.length);
        setExpense(result.totalExpenseWithMy);
        setTotalExpense(result.totalExpenseWithMy.groupTotalExpense);
        setBillHistory(result.billHistory);
        setNoOfBills(result.billHistory.length);
        setOweData(result.oweData);
        setLentData(result.lentData);
        setIsLoading(false);
      }
    };

    if (gid) {
      apicall();
    }
  }, [gid]);

  const onMemberAdd = () => {
    setNoOfMembers((pre) => pre + 1);
  };

  const onExpenseAdd = (amount, newBill, otherIncludes) => {
    setNoOfBills((pre) => pre + 1);
    setTotalExpense((pre) => pre + amount);
    setBillHistory((pre) => {
      return [newBill, ...pre];
    });

    let personalSplitAmount = amount / otherIncludes.length;
    otherIncludes.forEach((newlendid, newlentindex) => {
      let visit = false;
      lentData.forEach((lendobj, index) => {
        if (lendobj.id === newlendid) {
          // eslint-disable-next-line no-unused-vars
          visit = true;
          setLentData((pre) => {
            pre[index].lent = pre[index].lent + personalSplitAmount;
            return pre;
          });
        }
      });
      if (!visit) {
        groupMembers.forEach((obj) => {
          if (obj.id === newlendid) {
            setLentData((pre) => {
              return [
                ...pre,
                {
                  photo1: obj.photo1,
                  uname: obj.uname,
                  email: obj.email,
                  lent: personalSplitAmount,
                },
              ];
            });
          }
        });
      }
    });
  };

  return (
    <>
      <div
        className="groupexpand"
        style={{
          marginLeft: isTrigged ? "0px" : isExtendedSidebar ? "280px" : "80px",
        }}
      >
        {gid ? (
          isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {openGroupMemberCard && (
                <GroupMemberCard
                  gid={gid}
                  profileData={profileData}
                  groupInfo={groupInfo}
                  groupMembers={groupMembers}
                  onMemberAdd={onMemberAdd}
                  setGroupMembers={setGroupMembers}
                  setOpenGroupMemberCard={setOpenGroupMemberCard}
                />
              )}
              {openAddExpenceCard && (
                <AddExpenceCard
                  gid={gid}
                  groupMembers={groupMembers}
                  setOpenAppExpenceCard={setOpenAppExpenceCard}
                  onExpenseAdd={onExpenseAdd}
                />
              )}
              <div
                onClick={() => {
                  setOpenAppExpenceCard((pre) => !pre);
                }}
                className="addexpense_btn"
              >
                +
              </div>
              <div className="groupexpand_inner">
                <div className="groupheader">
                  <div className="title">
                    {isTrigged && (
                      <FontAwesomeIcon
                        style={{ cursor: "pointer", marginRight: "20px" }}
                        icon={faArrowLeft}
                        onClick={() => {
                          setSliderHandler(false);
                        }}
                      />
                    )}

                    <FontAwesomeIcon
                      style={{ cursor: "pointer" }}
                      icon={faEdit}
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    />
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={groupName}
                          onChange={(e) => {
                            setGroupName(e.target.value);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          onClick={() => {
                            changeGroupName();
                            setIsEditing(false);
                          }}
                        />
                      </>
                    ) : (
                      <span>{groupName}</span>
                    )}
                  </div>
                  <div
                    className="member"
                    onClick={() => setOpenGroupMemberCard((pre) => !pre)}
                  >
                    <FontAwesomeIcon icon={faPeopleRoof} />
                  </div>
                </div>

                <div className="groupbody">
                  <div className="mix-flex">
                    <ExpenseCard
                      expense={expense}
                      noOfBills={noOfBills}
                      noOfMembers={noOfMembers}
                      groupName={groupName}
                      totalExpense={totalExpense}
                    />

                    <OweCard oweData={oweData} />

                    <HistoryCard billHistory={billHistory} />
                    <LentCard lentData={lentData} />
                    <DeleteGroupCard />
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default GroupExpand;
