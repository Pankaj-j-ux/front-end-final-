/** @format */

import { NavLink } from "react-router-dom";

function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

const color = generateRandomColor();

const GroupCard = ({
  gid,
  gname,
  createdat,
  isExtendedSidebar,
  setSliderHandler,
}) => {
  const letter = gname.charAt(0).toUpperCase();
  createdat = new Date(createdat).toDateString();

  return (
    <NavLink to={`dashboard/${gid}`}>
      <div className="groupcard" onClick={() => setSliderHandler(true)}>
        <div
          className="card-img"
          style={{ backgroundColor: "rgba(18, 84, 160, 0.3)" }}
        >
          {letter}
        </div>
        {isExtendedSidebar && (
          <div
            // className={isExtendedSidebar ? "card-body" : "card-body-transition"}
            className="card-body"
          >
            <div className="card-title">{gname}</div>
            <div className="card-date">{createdat}</div>
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default GroupCard;
