import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  ChakraProvider,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export default function SettingLabel({ children, help }) {
  // eslint-disable-next-line react/display-name
  const Trigger = React.forwardRef((props, ref) => (
    <button ref={ref} className="focus:outline-none" {...props}>
      <HelpOutlineIcon className="text-gray-300 hover:text-gray-500" />
    </button>
  ));

  return (
    <div className="text-xl font-bold mb-4 mt-8">
      {children}
      &nbsp;
      <SettingsPopover trigger={Trigger}>
        <div className="text-white text-sm">{help}</div>
      </SettingsPopover>
    </div>
  );
}

function SettingsPopover({ children, trigger: Trigger }) {
  return (
    <ChakraProvider>
      <Popover placement="right-start">
        <PopoverTrigger>
          <Trigger />
        </PopoverTrigger>
        <PopoverContent bg="blue.800" borderColor="transparent" width="small">
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </ChakraProvider>
  );
}
