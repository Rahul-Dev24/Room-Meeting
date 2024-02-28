import React from "react";
import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setroomId] = useState("");
  const [userName, setuserName] = useState("");

  const createNewRoomID = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setroomId(id);

    toast.success("New room is created successfully...");
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Room Id & Username is required...");
      return;
    }

    // redirecting to the room page
    navigate(`editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img src="/logo1.png" style={{mix-blend-mode: "hard-light",
  border-radius: "12px"}} width={180} alt="" />
        <h4 className="mainLable">Paste invitation Room ID</h4>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
            className="inputBox"
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="inputBox"
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create{"  "}
            <a onClick={createNewRoomID} href="" className="createNewBtn">
              New Room
            </a>
          </span>
        </div>
      </div>

      <footer>
        <h4>
          Build with 💛 by <a href="">Rahul Singh</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
