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

  useEffect(() => {
    PeopleServices.getAllPeopleList()
      .then((res) => {
        setPeople(
          res.data.map((person: IPerson) => {
            return (
              <MenuItem key={person.id} value={person.id}>
                {person.name}
              </MenuItem>
            );
          })
        );
      })
      .catch((err) => {
        return toast.error(err.response.data);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    PeopleServices.selectUser(event.target.value).then((res) => {
      const cookies = new Cookies();
      cookies.set("jwt", `Barrier ${res.data}`, { path: "/" });
    });
  };

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
          <Select sx={{ width: 400 }} onChange={handleChange} defaultValue={""}>
            {people}
          </Select>
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
