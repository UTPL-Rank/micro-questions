const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const typeQuestion = {
  simple: 0,
  compuesta: 1,
  multiple: 2,
};

const questionSchema = new Schema(
  {
    textoPregunta: String,
    imagenPregunta: String,
    tipoPregunta: typeQuestion.simple,
    codigo: String,
    peso: Number,
    subPregunta: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { versionKey: false }
);

questionSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

questionSchema.plugin(uniqueValidator);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
