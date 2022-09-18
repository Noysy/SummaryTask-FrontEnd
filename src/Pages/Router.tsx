import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../Styles/Page.css";
import PeoplePage from "./PeoplePage";
import "react-toastify/dist/ReactToastify.css";
import GroupPage from "./GroupsPage";
import PeopleServices from "../Services/People";
import { useEffect, useState } from "react";
import { IPerson } from "../Interfaces/Person";
import Cookies from "universal-cookie";

const Main = () => {
  const [people, setPeople] = useState();

  return (
    <>
      <div id="page">
        <div id="nav-bar">
          <Link className="link" to="/people">
            <Button className="link-button" variant="text">
              People
            </Button>
          </Link>
          <Link className="link" to="/groups">
            <Button className="link-button" variant="text">
              Groups
            </Button>
          </Link>
          <hr />
        </div>
        <Routes>
          <Route
            path="/people"
            element={
              <div>
                <PeoplePage />
              </div>
            }
          />
          <Route path="/groups" element={<GroupPage />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Main;
