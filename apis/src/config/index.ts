import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://murichristopher:murilo10@cluster0.trclxof.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successfully connected to MongoDB");
});
