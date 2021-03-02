import React from "react";
import {
  ChakraProvider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

export default function SettingsPopover({ children, trigger: Trigger }) {
  return (
    <ChakraProvider>
      <Popover placement="right">
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
