const mongoose = require("mongoose");

async function connect() {
  if (process.env.NODE_ENV === 'test') return;

  try {
    await mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  } catch (err) {
    console.error("Error connecting to mongodb")
    console.error(err);
  }
}

module.exports = { connect };
