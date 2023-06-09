import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import staff from "../AllOfficers/officers.svg";
import "./messages.css";
import { Link } from "react-router-dom";
import { ForAuth } from "../Report/ForAuth";
import { ReportDetail } from "./ReportDetail";
import {instance} from "../../api/api";

export const Messages = () => {
  const [cases, setCases] = useState([]);
  const [detail, setDetail] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState()

  const handleDetail = () => {
    setDetail(!detail);
  };
  const allMessages = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://sf-final-project-be.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    setCases(result.data.data);
  };
  // useEffect(() => {
  //   instance.get('auth/').then(res => setApproved(res.data.data.user
  //   ))
  // }, [])
  useEffect(() => {
    console.log('useEffect')
    allMessages();
  }, [detail, newMessage]);

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h3 className="title">Все сообщения о кражах</h3>
      <div className="wrapper">
        <button
          className="addMessage"
          onClick={() => setNewMessage(!newMessage)}
        >
          Добавить сообщение
        </button>

        {(loading && (
          <div className="loading" style={{ alignSelf: "center" }}>
            loading...
          </div>
        )) ||
          (cases.length === 0 && <div></div>) ||
          (newMessage && (
            <ForAuth
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              approved={approved}
              setApproved={setApproved}
            />
          ))}
        <div className="messageContainer">
          {cases.map((item) => (
            <div key={item._id} className="message">
              <span
                className="new"
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  minWidth: "90px",
                  backgroundColor:
                    (item.status === "new" && "green") ||
                    (item.status === "in_progress" && "rgb(209, 130, 19)") ||
                    (item.status === "done" && "red"),
                }}
              >
                {item.status}
              </span>
              <Link
                onClick={handleDetail}
                className="link"
                to={`/cases/${item._id}`}
              >
                <li>{item.ownerFullName}</li>
              </Link>
            </div>
          ))}
        </div>
        {detail && (
          <ReportDetail
            cases={cases}
            detail={detail}
            setDetail={setDetail}
            approved={approved}
            setApproved={setApproved}
          />
        )}
      </div>
    </div>
  );
};
