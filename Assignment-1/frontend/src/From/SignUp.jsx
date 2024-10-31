import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [inputField, setInputField] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  console.log(inputField);

  const handleSignUp = async () => {
    if (inputField.userName && inputField.email && inputField.password) {
      console.log("SignUp  Success");

      const response = await axios
        .post("http://localhost:3000/signUpApi", inputField)
        .then(async (res) => {
          console.log(res);
          alert("Sign Up Success");
          navigate("/");
        })
        .catch((err) => err);
      console.log(response);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "20px",
          flexDirection: "column",
          boxShadow: "0px 0px 10px 0.10px",
          width: 600,
          height: 600,
          padding: 20,
          margin: 20,
          position: "relative",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 45,
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          Sign Up
        </h1>
        <label style={{ fontSize: 20 }}>Name</label>

        <input
          onChange={(e) => {
            setInputField({ ...inputField, name: e.target.value });
          }}
          placeholder="Enter your  user name"
          style={{
            width: "100% ",
            height: 40,
            padding: 10,
            border: "1px solid",
            borderRadius: 5,
            outline: "none ",

            margin: "10px 0px 20px  0px",
          }}
          type="text"
        />
        <label style={{ fontSize: 20 }}>User Name</label>

        <input
          onChange={(e) => {
            setInputField({ ...inputField, userName: e.target.value });
          }}
          placeholder="Enter your  user name"
          style={{
            width: "100% ",
            height: 40,
            padding: 10,
            border: "1px solid",
            borderRadius: 5,
            outline: "none ",

            margin: "10px 0px 20px  0px",
          }}
          type="text"
        />

        <label style={{ fontSize: 20 }}>Email</label>

        <input
          onChange={(e) => {
            setInputField({ ...inputField, email: e.target.value });
          }}
          placeholder="Enter your email"
          style={{
            width: "100% ",
            height: 40,
            padding: 10,
            border: "1px solid",
            borderRadius: 5,
            outline: "none",
            margin: "10px 0px 20px  0px",
          }}
          type="email"
        />

        <label style={{ fontSize: 20 }}>password</label>

        <input
          onChange={(e) => {
            setInputField({ ...inputField, password: e.target.value });
          }}
          id="passwordIcon"
          placeholder="Enter your password"
          style={{
            width: "100% ",
            height: 40,
            padding: 10,
            border: "1px solid",
            borderRadius: 5,
            outline: "none",
            margin: "10px 0px 20px  0px",
          }}
          type={!showPassword ? "text" : "password"}
        />
        <div style={{ position: "absolute", right: 38, bottom: 148 }}>
          {showPassword ? (
            <VisibilityOffIcon
              onClick={() => {
                setShowPassword(false);
              }}
            />
          ) : (
            <VisibilityIcon
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>
        <p style={{ fontSize: 15, marginBottom: 20 }}>
          you can also use your email to <NavLink to="/">login</NavLink>
        </p>

        <button
          onClick={handleSignUp}
          style={{
            width: "100%",
            height: 40,
            border: "1px solid",
            borderRadius: 5,
            outline: "none",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
