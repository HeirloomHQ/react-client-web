import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";

import FloatingTextField from "../floatingTextField";
import Button from "../button";
import { useAuth } from "../../lib/clientSideAuth";

export default function SignupForm({ toggleVariant }) {
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

  const { signup } = useAuth();

  const onSubmitSignup = async (values, { setSubmitting, setErrors }) => {
    try {
      await signup(values);
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
              error={!!errors.email && touched.email}
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
              error={!!errors.password && touched.password}
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
              error={!!errors.confirmPassword && touched.confirmPassword}
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
