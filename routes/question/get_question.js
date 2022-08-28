const express = require("express");
const router = express.Router();
const app = express();

// built-in middleware for json
app.use(express.json());

//Controller Question
const question_controller = require("../../controllers/question/questionController");

//GET Questions
router.get("/questions", question_controller.question_list);

module.exports = router;
