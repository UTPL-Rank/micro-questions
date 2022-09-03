const Question = require("../../models/Question");

const mongodb = require("../../mongo_db");

//Topic PubSub
const topicName = "hestia-topic";

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

// Display list of all Applicants.
exports.question_list = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json({
      success: true,
      message: "Lista de preguntas obtenida",
      questions,
    });
  } catch (error) {
    let message = "Ha ocurrido un error: " + error;
    return res.status(400).json({
      success: false,
      message: message,
    });
  }
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
        const msg = JSON.stringify(subQuestion);
        publishMessage(msg);
      } else {
        console.log('Parametros de pregunta incorectos');
        validate = true;
      }
    });
    if (validate != true) {
      savedQuestion = await question.save();
      const msg = JSON.stringify(question);
      publishMessage(msg);
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
    let message = "Ha ocurrido un error: " + error;
    return res.status(400).json({
      success: false,
      message: message,
    });
  }
};

async function publishMessage(msg) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(msg);
  try {
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}
