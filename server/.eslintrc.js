module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "extends": "google",
  "rules": {
    "no-var": "off",
    "no-tabs": "error",
    "indent": ["error", 2, {"SwitchCase": 1}],
    "no-console": "error",
    "max-len": ["error", {"code": 120, "tabWidth": 2, "ignoreUrls": true, "ignorePattern": "^goog.(module|require)"}]
  }
};