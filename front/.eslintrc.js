module.exports = {
    "parserOptions": {
        "ecmaVersion": 6
    },
    "extends": ["google", "angular"],
    "rules": {
        "no-var": "off",
        "indent": ["error", 2],
        "max-len": ["error", {"code": 120, "tabWidth": 2, "ignoreUrls": true, "ignorePattern": "^goog.(module|require)"}]
    }
};
