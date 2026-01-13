import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node // Adding Node globals helps if you have config files or build scripts
      } 
    },
    // This object below is where settings and rules live
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      // You can add custom rules here
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off", // Recommended for modern React (17+)

    },
  },
];