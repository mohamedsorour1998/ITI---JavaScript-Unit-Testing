const mongoose = require("mongoose");

module.exports = async () => {
  const connectionURI =
    "mongodb+srv://mohamedsorour:mohamedsorour@cluster0.qwq0cbi.mongodb.net/test";
  await mongoose
    .connect(connectionURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};
