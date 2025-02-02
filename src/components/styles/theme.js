import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          1: { value: "#2B4743" },
          "1Alpha": { value: "rgba(43, 71, 67, 0.2)" },
          2: { value: "#8C3839" },
          "2Alpha": { value: "rgba(140, 56, 57, 0.2)" },
          3: { value: "#DA7073" },
          "3Alpha": { value: "rgba(218, 112, 115, 0.2)" },
          4: { value: "#DDA83F" },
          "4Alpha": { value: "rgba(221, 168, 63, 0.2)" },
          5: { value: "#CEDEEB" },
          "5Alpha": { value: "rgba(206, 222, 235, 0.2)" },
          6: { value: "#FFD3DB" },
          "6Alpha": { value: "rgba(255, 211, 219, 0.2)" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.1}" },
          contrast: { value: "{colors.brand.3}" },
          fg: { value: "{colors.brand.4}" },
          muted: { value: "{colors.brand.1Alpha}" },
          subtle: { value: "{colors.brand.2Alpha}" },
          emphasized: { value: "{colors.brand.4}" },
          focusRing: { value: "{colors.brand.5}" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config);

