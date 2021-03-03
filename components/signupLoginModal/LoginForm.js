import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";

import FloatingTextField from "../textField/floatingTextField";
import Button from "../button";
import { useAuth } from "../../lib/clientSideAuth";

export default function LoginForm() {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const { login } = useAuth();

  const onSubmitLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
      // success
      setSubmitting(false);
      await router.push("/home");
    } catch (e) {
      if (e.isAxiosError) {
        const status = Math.floor(e.response.status / 100);
        if (status === 4) {
          setErrors({ password: e.response.data.msg });
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
              error={!!errors.email && touched.email}
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
              error={!!errors.password && touched.password}
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
