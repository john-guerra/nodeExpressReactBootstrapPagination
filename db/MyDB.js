function MyDB() {
  const myDB = {};

  myDB.findByUsername = async (username) => {
    // I'm checking on the db for username

    return username === "john"
      ? {
          username: "john",
          password: "johnLovesWeb",
        }
      : null;
  };

  return myDB;
}

module.exports = MyDB();
