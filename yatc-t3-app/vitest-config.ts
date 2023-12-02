/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path, { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    alias: {
      'yatc/': new URL('./src/', import.meta.url).pathname, 
    },
    testTimeout: 3,
  },
});