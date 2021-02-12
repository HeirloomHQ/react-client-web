import React from "react";
import Image from "next/image";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import Close from "./icons/close";
import FloatingTextField from "./floatingTextField";
import Button from "./button";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const onSubmitLogin = async (values, { setSubmitting }) => {
    try {
      await axios.post("/api/auth/login", values);
      // success
      setSubmitting(false);
      await router.push("/home");
    } catch (e) {
      // failed
      if (e.isAxiosError) {
        const status = Math.floor(e.response.status / 100);
        if (status === 5) {
          window.alert(JSON.stringify(e.response.data, null, 2));
        }
      } else {
        // network or other error
        window.alert(JSON.stringify(e.response.data, null, 2));
      }
    }
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="font-sans font-bold text-3xl">Sign in</h2>
      </div>
      <Formik
        //initialValues correspond to 'name' value for each FloatingTextField object
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        //Call to the api route using axios
        onSubmit={onSubmitLogin}
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
              className="mt-8"
              id="sign-in-email"
              name="email"
              placeholder="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
            />
            {errors.email && touched.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <FloatingTextField
              className={errors.email && touched.email ? "mt-2" : "mt-8"}
              id="sign-in-password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <Button
              className={`${
                errors.password && touched.password ? "mt-2" : "mt-8"
              } h-12 text-xl`}
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
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
    password: Yup.string()
      .required("Password required")
      .min(8, "Must contain at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password does not match")
      .required("Confirm Password Required"),
  });

  const onSubmitSignup = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post("/api/auth/signup", values);
      // success
      setSubmitting(false);
      await router.push("/home");
    } catch (e) {
      // failed
      if (e.isAxiosError) {
        const status = Math.floor(e.response.status / 100);
        if (status === 4) {
          setErrors({ email: e.response.data.msg });
        } else if (status === 5) {
          window.alert(JSON.stringify(e.response.data, null, 2));
        }
      } else {
        // network or other error
        window.alert(JSON.stringify(e.response.data, null, 2));
      }
    }
  };

  return (
    <>
      <div className="mt-8">
        <h2 className="font-sans font-bold text-3xl">Create your account</h2>
      </div>
      {/* Password Matching Source: https://github.com/formium/formik/issues/90 */}
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmitSignup}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FloatingTextField
              className="mt-8"
              id="sign-up-email"
              name="email"
              placeholder="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*css styling changes font color for error to red*/}
            {errors.email && touched.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <FloatingTextField
              className={errors.email && touched.email ? "mt-2" : "mt-8"}
              id="sign-up-password"
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <FloatingTextField
              className={errors.password && touched.password ? "mt-2" : "mt-8"}
              id="sign-up-password-confirm"
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <Button
              className={`${
                errors.password && touched.password ? "mt-2" : "mt-8"
              } h-12 text-xl`}
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
