import { Field as ChakraField, Box, defineStyle } from "@chakra-ui/react";
import * as React from "react";

export const Field = React.forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, floatingLabel = false, ...rest } = props;

  return (
    <ChakraField.Root ref={ref} {...rest}>
      {floatingLabel ? (
        <Box pos="relative" w="full">
          {React.cloneElement(children, { className: "peer", placeholder: "" })}
          <ChakraField.Label css={floatingStyles}>{label}</ChakraField.Label>
        </Box>
      ) : (
        <>
          {label && (
            <ChakraField.Label>
              {label}
              <ChakraField.RequiredIndicator fallback={optionalText} />
            </ChakraField.Label>
          )}
          {children}
        </>
      )}
      {helperText && <ChakraField.HelperText>{helperText}</ChakraField.HelperText>}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  );
});

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "brand.solid",
  _peerPlaceholderShown: {
    color: "brand.solid",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "brand.muted",
    top: "-3",
    insetStart: "2",
  },
});
