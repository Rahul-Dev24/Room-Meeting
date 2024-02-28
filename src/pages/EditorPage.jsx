import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigater = useNavigate();
  // const [editorAccess, seteditorAccess] = useState(true);
  const [clint, setclints] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit("join", {
        roomId,
        userName: location.state?.userName,
      });

      //listening for joined event

      socketRef.current.on("join", ({ clients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          // seteditorAccess(false);
          toast.success(`${userName} Joined the room...`);
        }
        setclints(clients);

        //not working
        // socketRef.current.emit("sync-code", {
        //   codes: codeRef.current,
        //   socketId,
        // });
      });

      //listening for disconnected event

      socketRef.current.on("disconnected", ({ userName, socketId }) => {
        toast.error(`${userName} left the room...`);

        setclints((prev) => {
          return prev.filter((clin) => clin.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("join");
      socketRef.current.off("disconnected");
    };
  }, []);

  const handleError = (error) => {
    toast.error("Connection failed, try again later...");
    reactNavigater("/");
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied...");
    } catch (err) {
      toast.error("Could not copy the Room ID...");
      console.log(err);
    }
  };

  const leaveRoom = () => {
    reactNavigater("/");
  };

  if (!location?.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/logo.png" width={150} alt="logo" className="logoImg" />
          </div>
          <br />
          <h3>Connected</h3>
          <div className="clientsList">
            {clint?.map((item) => (
              <Client key={item.socketId} userName={item.userName} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy Room-ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>

      {/* code editer */}
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
