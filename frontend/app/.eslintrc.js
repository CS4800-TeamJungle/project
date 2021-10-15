module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "prettier"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    curly: "error",
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-unused-vars": "off",
    "comma-dangle": ["error", "never"]
  }
};
