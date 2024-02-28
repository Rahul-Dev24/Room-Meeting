import React from "react";
import { PiFinnTheHumanFill } from "react-icons/pi";

const Client = ({ userName }) => {
  return (
    <div className="client">
      <PiFinnTheHumanFill  />
{/*       <img src="/vite.svg" width={30} height={30} alt="" /> */}
      <span className="userName">{userName}</span>
    </div>
  );
};

export default Client;
