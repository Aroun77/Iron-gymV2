import { defineConfig, presetWind } from "unocss";

export default defineConfig({
  dark: "class",
  presets: [presetWind()],
  theme: {
    extend: {
      keyframes: {
        pulse: '{ 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }',
      },
      animation: {
        pulse: 'pulse 1.2s ease-in-out infinite',
      },
    },
  },
});
