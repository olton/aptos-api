export default {
  verbose: true,
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/src/plugins/*.js",
    "**/src/core/*.js",
    "**/src/helpers/*.js",
    "**/src/dataset/*.js",
  ],
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [
  ],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/helpers/"]
}