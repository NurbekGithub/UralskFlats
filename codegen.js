module.exports = {
  schema: "https://uralsk-flats.herokuapp.com/v1/graphql",
  documents: "./src/graphql/*.graphql",
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false
      }
    }
  }
};
