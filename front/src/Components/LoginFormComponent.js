import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginFormComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await (await fetch("/getUser")).json();

      console.log("Got user", res);
      setUser(res.user);
    };

    console.log("Checking user");
    checkUser();
  }, []);

  const loginForm = (
    <form action="/login" method="post">
      <div>
        <label>
          Username:
          <input
            className="form-control"
            type="text"
            name="username"
            defaultValue="john"
          />
        </label>
        <br />
      </div>
      <div>
        <label>
          Password:
          <input
            className="form-control"
            type="password"
            name="password"
            defaultValue="johnLovesWeb"
          />
        </label>
      </div>
      <div>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );

  const logoutForm = (
    <div>
      Hello {user}
      <button>Log out</button>
    </div>
  );

  return <div>{user ? logoutForm : loginForm}</div>;
};

LoginFormComponent.propTypes = {};

export default LoginFormComponent;
