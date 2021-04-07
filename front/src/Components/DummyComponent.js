import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./DummyComponent.css";

const style = { fontSize: "22pt" };

const DummyComponent = ({ id }) => {
  const myRef = useRef();

  return (
    <div className="DummyComponent" style={style}>
      <label>
        {" "}
        Dummy Search{" "}
        <input
          ref={myRef}
          onChange={(evt) => {
            console.log(myRef.current.value, evt.target.value);
          }}
          type="text"
        />
      </label>
    </div>
  );
};

DummyComponent.propTypes = {};

export default DummyComponent;
