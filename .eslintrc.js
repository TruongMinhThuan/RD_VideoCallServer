module.exports ={
    "env": {
      "browser": true,
      "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {}
  }
  