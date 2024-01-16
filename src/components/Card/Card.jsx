import React from "react";
import { useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import "./Card.scss";

import { selectRole } from "../../features/me/selectors";

const Card = ({ createdBy, children, isRole = false }) => {
  const { role } = useSelector(selectRole);

  return (
    <div
      className="card"
      style={{
        border: `1px solid ${
          isRole ? (createdBy === "admin" ? "red" : "green") : "black"
        }`,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
