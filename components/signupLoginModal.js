import React from "react";
import Image from "next/image";
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
      className={`modal ${
        !open && "opacity-0 pointer-events-none"
      } transition-opacity duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center`}
      onClick={() => console.log("hit")}
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
      <FloatingTextField
        className="mt-8"
        id="sign-in-email"
        placeholder="Email"
        type="text"
      />
      <FloatingTextField
        className="mt-8"
        id="sign-in-password"
        placeholder="Password"
        type="password"
      />
      <Button
        className="mt-8 h-12 text-xl"
        variant="filled"
        fullWidth={true}
        disabled={true}
      >
        Sign in
      </Button>
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
      <FloatingTextField
        className="mt-8"
        id="sign-up-email"
        placeholder="Email"
        type="text"
      />
      <FloatingTextField
        className="mt-8"
        id="sign-up-password"
        placeholder="Password"
        type="password"
      />
      <FloatingTextField
        className="mt-8"
        id="sign-up-password-confirm"
        placeholder="Confirm password"
        type="password"
      />
      <Button
        className="mt-8 h-12 text-xl"
        variant="filled"
        fullWidth={true}
        disabled={true}
      >
        Create Account
      </Button>
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
