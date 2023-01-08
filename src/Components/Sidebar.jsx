/** @format */

import GroupCard from "./GroupCard";

const Sidebar = ({
  groupData,
  setOpenCreateGroup,
  isExtendedSidebar,
  profileData,
  isTrigged,
  setSliderHandler,
  isSlider,
}) => {
  return (
    <>
      <div
        className="sidebar"
        style={{
          width: isTrigged ? "50%" : isExtendedSidebar ? "280px" : "80px",
          marginLeft: isTrigged ? (isSlider ? "-50%" : "0%") : "0%",
        }}
      >
        <div className="deign1">
          <button
            className="addgroup-btn"
            onClick={() => setOpenCreateGroup(true)}
          >
            {isExtendedSidebar && <span className=""> CREATE NEW GROUP </span>}
            <span className="addgroupclass"> +</span>
          </button>
        </div>
        <div className="groups">
          {groupData.map((obj, index) => {
            return (
              <GroupCard
                key={index}
                gid={obj.id}
                gname={obj.gname}
                createdat={obj.Created_at}
                isExtendedSidebar={isExtendedSidebar}
                setSliderHandler={setSliderHandler}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
