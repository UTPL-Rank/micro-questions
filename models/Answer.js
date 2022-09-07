const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    textoRespuesta: String,
    imagenRespuesta: String,
    esCorrecta: Boolean,
    pregunta: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { versionKey: false }
);

answerSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
