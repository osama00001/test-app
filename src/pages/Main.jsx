import React, { useEffect, useState } from "react";
import "./Main.scss";
import db from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { addDataToFirestore } from "./Post";
import { v4 as uuidv4 } from "uuid";

const Main = () => {
  const sectorsCollection = db.collection("sectorsData");
  const [optionData, setOptionData] = useState([]);
  const [selectEntry, setSelectEntry] = useState("");
  const [notification, setNotification] = useState({ success: false, msg: "" });
  const [name, setName] = useState("");
  const [terms, setTerms] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    selected: [],
    terms: false,
  });
  const [showDefault, setShowDefault] = useState(true);
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    sectorsCollection
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setOptionData(data.optionsArray);
          setShowDefault(true);
          setLoader(false);
        });
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
  }, []);

  const handleSubmit = async () => {
    if (name && terms && selectEntry) {
      if (name.trim().length > 4) {
        const data = await addDataToFirestore(
          name.trim(),
          selectEntry,
          terms,
          uuidv4()
        );
        console.log(data)
        if (data) {
          setNewData({
            name: data.name,
            selected: data.selected,
            terms: data.terms,
          });
          setShowDefault(false);
          setNotification({ success: true, msg: "Data added successfully" });
          setTimeout(() => {
            setNotification({});
          }, 3000);
        }
      } else {
        setNotification({
          success: false,
          msg: "name must be greater than 4 characters",
        });
        setShowError(true);
        setTimeout(() => {
          setNotification({});
          setShowError(false);
        }, 3000);
      }
    } else {

      setNotification({ success: false, msg: "All feilds are mendetory *" });
      setShowError(true);
      setTimeout(() => {
        setNotification({});
        setShowError(false);
      }, 3000);
    }
  };

  const handleOptionsData = () => {
    if (!loader && !showDefault) {
      return newData?.selected.map((item) => {
        return <option value={item}>{item}</option>;
      });
    } else {
      return optionData?.map((item) => {
        return <option value={item.value}>{item.value}</option>;
      });
    }
  };

  return (
    <div className="index_container">
      <div className="form_wrapper">
        <p>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </p>
        <div className="name_feild">
          <h1>Name </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="selector_wrapper">
          <h1>Sectors</h1>
          <select
            multiple
            size="5"
            onChange={(e) =>
              setSelectEntry(
                [...e.target.options]
                  .filter((option) => option.selected)
                  .map((option) => option.value)
              )
            }
          >
            {handleOptionsData()}
          </select>
        </div>
        <div className="check_box_wrapper">
          <input
            type="checkbox"
            checked={terms}
            onClick={() => setTerms(!terms)}
          />
          <h1>Agree to terms</h1>
        </div>

        <div className="submit_button">
          {notification.success && <p>{notification.msg}</p>}
          {!notification.success && showError && <p>{notification.msg}</p>}
          <button onClick={handleSubmit}>Save</button>
          <Link to="/details">
            <button> Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
