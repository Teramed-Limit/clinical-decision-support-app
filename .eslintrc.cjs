module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "eslint-config-prettier",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      },
      "node": {
        "paths": ["src", "public"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  ignorePatterns: [".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react+(|-dom)",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "import/prefer-default-export": 0,
    "no-console": ["error", { allow: ["warn", "error"] }],
    "linebreak-style": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-plusplus": "off",
    "consistent-return": "off",
    "react/require-default-props": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/static-property-placement": 0,
    "react/jsx-props-no-spreading": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/alt-text": 0,
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-restricted-syntax": ["error"],
    "no-return-assign": 0,
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  }
};
