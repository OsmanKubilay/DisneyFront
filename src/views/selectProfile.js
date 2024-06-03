import { React, useEffect, useState } from "react";
import "./../scss/general/selectProfile.scss";
import logo from "./../assets/images/logo.svg";
import spiderman from "./../assets/images/spiderman2.jpg";
import axios from "axios";
import BackdropBz from "components/BackdropBz";

const endPoint = "https://localhost:7112/api/Profile/ProfileGetAllRequest";

const SelectProfile = () => {
  const [backdropOpen, setBackDrop] = useState(false);
  const [profileList, setProfileList] = useState([]);

  const getProfileList = () => {
    setBackDrop(true);
    axios
      .get(endPoint)
      .then((res) => {
        console.log(res);
        setProfileList(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(setBackDrop(false));
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <>
      {profileList.length > 0 && (
        <div className="select-profile-container">
          <img
            src={logo}
            style={{ margin: "15px", marginLeft: "30px", display: "block" }}
            width="100px"
            height="40px"
            alt="Your Logo"
          />

          <div className="select-profiles-container">
            <h2 class="padding--bottom-6 mb-4" style={{ color: "#F9F9F9" }}>
              Kim İzliyor?
            </h2>
            <div className="profiles">
              {profileList.map((item, index) => (
                <div className="profile">
                  <div className="profile-circle">
                    <img
                      className="profile-image"
                      src={spiderman}
                      style={{ objectFit: "cover" }}
                      width="100%"
                      height="100%"
                      alt="Your Logo"
                    />
                  </div>
                  <h3
                    className="margin--top-6 text--center"
                    style={{ color: "#F9F9F9" }}
                  >
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <BackdropBz backdropOpen={backdropOpen}></BackdropBz>
        </div>
      )}
    </>
  );
};

export default SelectProfile;
