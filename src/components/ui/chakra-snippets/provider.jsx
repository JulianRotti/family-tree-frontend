"use client"

import { system } from "components/styles/theme.js"
import {
  ColorModeProvider
} from "components/ui/chakra-snippets/color-mode.jsx"
import { ChakraProvider } from "@chakra-ui/react"

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
