import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Portal,
} from "@chakra-ui/react";
import React from "react";

export const HoverCardContent = React.forwardRef(function HoverCardContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <PopoverContent ref={ref} {...rest} />
    </Portal>
  );
});

export const HoverCardArrow = React.forwardRef(function HoverCardArrow(props, ref) {
  return <PopoverArrow ref={ref} {...props} />;
});

export const HoverCardRoot = Popover;
export const HoverCardTrigger = PopoverTrigger;
