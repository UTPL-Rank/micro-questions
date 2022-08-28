const express = require("express");
const router = express.Router();

//Controller Question
const question_controller = require("../../controllers/question/questionController");

//POST create Applicant
router.post("/newQuestion", question_controller.question_create_post);

module.exports = router;
