import { Box, Field, Input, defineStyle } from "@chakra-ui/react"

const Demo = () => {
  return (
    <Field.Root>
      <Box pos="relative" w="full">
        <Input className="peer" placeholder="" />
        <Field.Label css={floatingStyles}>Email</Field.Label>
      </Box>
    </Field.Root>
  )
}

export default Demo;

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
})
