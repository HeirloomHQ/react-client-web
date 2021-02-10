import React from "react";
import Image from "next/image";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import Close from "./icons/close";
import FloatingTextField from "./floatingTextField";
import Button from "./button";

export default function SignupLoginModal({ open, variant, onClose, toggleVariant }) {
  React.useEffect(() => {
    function handleEscapeKey(event) {
      if (event.keyCode === 27 && open) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`z-50 ${
        !open && "opacity-0 pointer-events-none"
      } transition-opacity duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div
        className="modal-overlay absolute w-full h-full opacity-90 placeholder-"
        style={{ background: "#FEF9F5" }}
      />

      <div className="modal-container bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-8 text-left px-12">
          <div className="flex justify-between items-center pb-3">
            <div className="invisible" onClick={onClose}>
              <Close />
            </div>
            <Image
              src="/assets/img/heirloom-logo-no-txt@30.png"
              alt="Heirloom logo"
              height={30}
              width={30}
            />
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <Close />
            </div>
          </div>
          {variant === "signIn" ? (
            <SignInForm />
          ) : (
            <SignUpForm toggleVariant={toggleVariant} />
          )}
        </div>
      </div>
    </div>
  );
}

function SignInForm() {
  return (
    <>
      <div className="mt-8">
        <h2 className="font-sans font-bold text-3xl">Sign in</h2>
      </div>
      <Formik
        //initialValues correspond to 'name' value for each FloatingTextField object
        initialValues={{ email: "", password: "" }}

        //Formik's validation tool utilizing Yup
        validationSchema={
          Yup.object().shape({
          //Validates email string after every keyword
          email: Yup.string().email('Invalid Email').required("Required"),
          //Validates if a password has been inputted
          password: Yup.string().required("Password Required")
        })}

        //simply testing out yup, to my knowledge it is doing the same thing as validate.
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}
        
        //Call to the api route using axios
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("/api/auth/login", values)
            .then((response) => {
              window.alert(JSON.stringify(response.data, null, 2));
              setSubmitting(false);
            })
            .catch((e) => {
              if (e.isAxiosError) {
                window.alert(JSON.stringify(e.response, null, 2));
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <FloatingTextField
              //className altered when invalid email is submitted. determines styling
              className={errors.email && touched.email ? "error" : "mt-8"}
              id="sign-in-email"
              name="email"
              placeholder="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.email && touched.email && (<p style={{color:"#ff2824"}}>{errors.email}</p>)}
            <FloatingTextField
            //className altered when invalid password is submitted. determines styling
              className={errors.password && touched.password ? "error" : "mt-8"}
              id="sign-in-password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.password && touched.password && (<p style={{color:"#ff2824"}}>{errors.password}</p>)}
            <Button
              className="mt-8 h-12 text-xl"
              variant="filled"
              fullWidth={true}
              disabled={isSubmitting}
              type="submit"
            >
              Sign in
            </Button>
          </form>
        )}
      </Formik>
      <hr className="solid my-5" />
      <div className="flex justify-center">
        <a className="text-heirloomOrange">Forgot password?</a>
      </div>
    </>
  );
}

function SignUpForm({ toggleVariant }) {
  return (
    <>
      <div className="mt-8">
        <h2 className="font-sans font-bold text-3xl">Create your account</h2>
      </div>
      {/* Password Matching Source: https://github.com/formium/formik/issues/90 */}
      <Formik
        //initialValues correspond to 'name' value for each FloatingTextField object
        initialValues={{ email: "", password: "", confirmPassword: "" }}

        //Formik's validation tool utilizing Yup
        validationSchema={
          Yup.object().shape({
            //Email Validation source: https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470
            //too many bugs, going to research yup more

          //Validates email string after every keyword
          email: Yup.string().required("Invalid Email").email("Invalid Email"),
          //Validates if a password has been inputted
          password: Yup.string().required("Password Required").min(8, "Must contain at least 8 characters."),
          //Validates if the confirmPassword field is equal to the password field
          confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], "Password does not match.")
            .required('Confirm Password Required').min(8, "Must contain at least 8 characters.")
        })}

        //Call to the api call using axios
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("/api/auth/signup", values)
            .then((response) => {
              window.alert(JSON.stringify(response.data, null, 2));
              setSubmitting(false);
            })
            .catch((e) => {
              if (e.isAxiosError) {
                window.alert(JSON.stringify(e.response, null, 2));
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <FloatingTextField
              //className altered when invalid email is submitted. determines styling
              className={errors.email && touched.email ? "error" : "mt-8"}
              id="sign-up-email"
              name="email"
              placeholder="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.email && touched.email && (<p style={{color:"#ff2824"}}>{errors.email}</p>)}
            <FloatingTextField
              //className altered when invalid password is submitted. determines styling
              className={errors.password && touched.password ? "error" : "mt-8"}
              id="sign-up-password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.password && touched.password && (<p style={{color:"#ff2824"}}>{errors.password}</p>)}
            <FloatingTextField
              //className altered when invalid confirmPassword is submitted. determines styling
              className={errors.confirmPassword && touched.confirmPassword ? "error" : "mt-8"}
              id="sign-up-password-confirm"
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.confirmPassword && touched.confirmPassword
                && (<p style={{color:"#ff2824"}}>{errors.confirmPassword}</p>)}
            <Button
              className="mt-8 h-12 text-xl"
              variant="filled"
              fullWidth={true}
              disabled={isSubmitting}
            >
              Create Account
            </Button>
            </form>
        )}

      
      </Formik>
      <hr className="solid my-5" />
      <div className="flex justify-center">
        <span className="text-gray-500 font-extralight">
          Already have an account?&nbsp;
          <span
            className="text-heirloomOrange hover:underline font-extralight"
            onClick={toggleVariant}
          >
            Sign in
          </span>
        </span>
      </div>
    </>
  );
}
