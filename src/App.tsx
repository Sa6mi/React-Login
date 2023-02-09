import { useState } from "react";
import "./App.css";
import Menu from "./Components/Menu/Menu";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import NotLoggedIn from "./Pages/Not Logged In/NotLoggedin";
import Users from "./Pages/Users/Users";
import { Navigate, Route, Routes } from "react-router-dom";
import { getSavedUser } from "./Utils/UserFunctions";
import Posts from "./Pages/Posts/Posts";
import Comment from "./Pages/Posts/Comment/Comment";
// import Tags from "./Pages/Posts/Tags";

function App() {
  const [isloggedin, setIsLoggedIn] = useState(
    getSavedUser().username ? true : false
  );
  const Logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="App">
      {isloggedin && <Menu Logout={Logout}></Menu>}
      <div className="Content">
        <Routes>
          <Route
            path="/"
            element={
              !isloggedin ? (
                <NotLoggedIn />
              ) : (
                <Navigate to="/Dashboard" replace />
              )
            }
          />
          <Route
            path="/Users"
            element={
              !isloggedin ? <Users /> : <Navigate to="/Dashboard" replace />
            }
          />
          <Route
            path="/Login"
            element={
              !isloggedin ? (
                <Login Login={setIsLoggedIn} />
              ) : (
                <Navigate to="/Dashboard" replace />
              )
            }
          />
          <Route
            path="/Dashboard"
            element={isloggedin ? <Dashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/Posts"
            element={isloggedin ? <Posts /> : <Navigate to="/" replace />}
          ></Route>
          <Route
            path="/Comment"
            element={isloggedin ? <Comment /> : <Navigate to="/" replace />}
          >
            <Route
              path=":id"
              element={isloggedin ? <Comment /> : <Navigate to="/" replace />}
            >
              {" "}
            </Route>
          </Route>
          {/* <Route
            path="/Tags"
            element={isloggedin ? <Tags /> : <Navigate to="/" replace />}
          >
            <Route
              path=":tag"
              element={isloggedin ? <Tags /> : <Navigate to="/" replace />}
            >
              {" "}
            </Route>
          </Route> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
