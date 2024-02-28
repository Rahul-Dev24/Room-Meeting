import React from "react";

const Client = ({ userName }) => {
  return (
    <div className="client">
      <img src="/vite.svg" width={30} height={30} alt="" />
      <span className="userName">{userName}</span>
    </div>
  );
};

export default Client;
