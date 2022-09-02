const Question = require("../../models/Question");

const mongodb = require("../../mongo_db");

// Display list of all Applicants.
exports.question_list = async (req, res) => {
  const questions = await Question.find({});
  res.status(200).json({
    success: true,
    message: "Lista de preguntas obtenida",
    questions,
  });
};

exports.question_create_post = async (req, res) => {
  const {
    textoPregunta,
    imagenPregunta,
    tipoPregunta,
    codigo,
    peso,
    subPreguntas,
  } = req.body;
  let question = new Question({
    textoPregunta,
    imagenPregunta,
    tipoPregunta,
    codigo,
    peso,
  });
  let validate = false;
  try {
    subPreguntas.forEach(async (subPregunta) => {
      if (subPregunta.tipoPregunta != 1 && question.tipoPregunta == 1) {
        let subQuestion = new Question({
          textoPregunta: subPregunta.textoPregunta,
          imagenPregunta: subPregunta.imagenPregunta,
          tipoPregunta: subPregunta.tipoPregunta,
          codigo: subPregunta.codigo,
          peso: subPregunta.peso,
        });
        subQuestion.save();
        question.subPreguntas = question.subPreguntas.concat(subQuestion._id);
      } else {
        validate = true;
      }
    });
    if (validate != true) {
      savedQuestion = await question.save();
      return res.status(201).json({
        success: true,
        message: "Pregunta almacenada correctamente",
        savedQuestion,
      });
    } else {
      let message = "Pregunta no guardada";
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
  } catch (error) {
    let message = "Ha ocurrido un error: ";
    return res.status(400).json({
      success: false,
      message: message + error,
    });
  }
};
