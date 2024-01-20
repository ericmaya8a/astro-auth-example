function createUser(name) {
  return {
    name,
    email: `${name.toLowerCase()}@gmail.com`,
    password: "$2a$10$QuXvPZQn7WVbRVIVG1bIEeB70uCqKyAa7bqLqznbhLoAjOsltXfVe", // Test!234
  };
}

module.exports = {
  createUser,
};
