const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3005;
mongoose
  .connect(
    "mongodb+srv://aleksDev:20021224@node-1.aytwk.mongodb.net/GraphQL?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("================================================="))
  .catch((e) => console.log(e));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started!");
});
