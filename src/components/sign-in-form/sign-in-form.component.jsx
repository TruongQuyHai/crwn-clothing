import { useState } from "react";

import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  emailSignIn: "",
  passwordSignIn: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { emailSignIn, passwordSignIn } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        emailSignIn,
        passwordSignIn
      );
      console.log(response);
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        default:
          alert("error with code:", err.code);
      }
      resetFormFields();
    }
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (err) {
      if (err.code === "auth/cancelled-popup-request") return;
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I don't have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          name="emailSignIn"
          value={emailSignIn}
          id="emailSignIn"
          onChange={handleChange}
          required
        />
        <FormInput
          label="password"
          type="password"
          name="passwordSignIn"
          value={passwordSignIn}
          id="passwordSignIn"
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
