const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (err) {
    console.warn(err);
    throw new Error("Error in DB");
  }
};

module.exports = {
  dbConnection,
};
