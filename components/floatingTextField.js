import React from "react";

const textStyles = "text-lg text-grey-darker font-sans";

export default function FloatingTextField({
  className,
  id,
  name,
  placeholder,
  value,
  onChange,
  type,
}) {
  const [active, setActive] = React.useState(false);

  function handleActivation(e) {
    const prevState = active;
    const currState = !!e.target.value;
    if (currState !== prevState) setActive(currState);
    !!onChange && onChange(e);
  }

  return (
    <div className={`${className} h-14 relative border-2 border-gray-500 rounded-lg`}>
      <label
        className={[
          "absolute top-0 left-0 flex items-center p-3",
          "text-opacity-50 text-gray-900 select-none",
          "transition-all duration-200 ease-in-out",
          active ? "text-sm pt-2" : "h-full text-lg",
        ].join(" ")}
        htmlFor={id}
      >
        {placeholder}
      </label>
      <input
        className={`${textStyles} ${
          active && "pt-6"
        } outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-3`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleActivation}
      />
    </div>
  );
}
