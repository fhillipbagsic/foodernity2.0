import { Hidden, Toolbar, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import Main from "../../components/Shared/Main";
import NavBar from "../../components/Admin/NavBar";
import NavTab from "../../components/Admin/Users/NavTab";
import { useEffect, useState } from "react";
import Loading from "../../components/Shared/Loading";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setUsers } from "../../store/users";
import { Redirect, withRouter } from "react-router";
import bcryptjs from "bcryptjs";

function Users() {
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const responsive = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.post("https://foodernity.herokuapp.com/user/getUsers").then(
      (response, err) => {
        if (err) {
          console.log("error: " + err);
        }
        setLoading(false);
        dispatch(setUsers(response.data));
      }
    );
  }, [dispatch]);

  return bcryptjs.compareSync(
    "MHTPadmin2021@gmail.com",
    localStorage.getItem("vh") || ""
  ) ? (
    <>
      <Helmet>
        <title>Users | Foodernity</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: responsive ? "column" : "row",
        }}
      >
        <Main>
          <Hidden mdUp>
            <Toolbar />
          </Hidden>
          <NavBar />
          {loading ? <Loading /> : <NavTab />}
        </Main>
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default withRouter(Users);
