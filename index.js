const express = require("express");
const app = express();

// built-in middleware for json
app.use(express.json());

//Routes question
app.use("/question", require("./routes/question/get_question"));
app.use("/question", require("./routes/question/post_question"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
