const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkPassword = function(raw, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(raw, hash, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * Generate password hash and salt from raw password passed as first parameter and return them
 * @param {*} password
 */
const hashPasswordAsync = async (password) => {
  const saltRounds = 10;

  const passwordSalt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, passwordSalt);

  return { passwordHash, passwordSalt };
};

function cleanObject(obj) {
  for (let i = 0; i < obj.length; i++) {
    for (var propName in obj[i]) {
      if (obj[i][propName] === null || obj[i][propName] === undefined) {
        delete obj[i][propName];
      }
    }
  }

  return obj;
}

function getUserIdFromToken(authorization) {
  if (authorization) {
    const authorizationString = authorization;
    const tokens = authorizationString.split(" ");
    const jwtToken = tokens[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY || 'secretkey');
    var userId = decoded.id;
    return userId;
  } else {
    return null;
  }
}

// 1 - correct, 2 - partially correct, 3 - incorrect, 4 - unanswered
function mark(userAnswers, correctAnswers, typeArray) {
  for (let i = 0; i < userAnswers.length; i++) {
    let type_id = typeArray[i];
    if (
      (userAnswers[i][1].length === 1 && userAnswers[i][1][0][0] === "") ||
      (type_id === 2 && userAnswers[i][1].every(ans => ans[1] === "?"))
    ) {
      
      userAnswers[i].push(4)
      userAnswers[i].push([])
      userAnswers[i].push(correctAnswers[i][1])
      userAnswers[i].marked = 4;

    } else {
      let incorrects = [];
      let corrects = [];

      

      if (type_id === 1) {
        for (let j = 0; j < correctAnswers[i][1].length; j++) {
          if (!userAnswers[i][1].includes(correctAnswers[i][1][j])) {
            incorrects.push(correctAnswers[i]);
            corrects.push([]);
          } else {
            corrects.push(correctAnswers[i]);
            incorrects.push([]);
          }

          if (corrects[0].length === 0) {
            userAnswers[i].marked = 3;
          } else if (corrects[0].length === correctAnswers[i].length) {
            userAnswers[i].marked = 1;
          } else {
            debugger
            userAnswers[i].marked = 2;
          }
        }
      } else if (type_id === 2) {
        for (let j = 0; j < userAnswers[i][1].length; j++) {
          if (correctAnswers[i][1][j][1] === userAnswers[i][1][j][1]) {
            corrects.push(correctAnswers[i][1][j]);
            incorrects.push([]);
          } else {
            incorrects.push(correctAnswers[i][1][j]);
            corrects.push([]);
          }
        }

        if (corrects.length === 0) {
          userAnswers[i].marked = 3;
        } else if ( corrects.filter(c => c.length === 2).length === correctAnswers[i][1].length) {
          debugger
          userAnswers[i].marked = 1;
        } else {
          userAnswers[i].marked = 2;
        }
      } else if (type_id === 3) {
        for (let j = 0; j < userAnswers[i][1].length; j++) {
          if (correctAnswers[i][1][j][1] === userAnswers[i][1][j][1]) {
            corrects.push(correctAnswers[i][1][j]);
            incorrects.push([]);
          } else {
            incorrects.push(correctAnswers[i][1][j]);
            corrects.push([]);
          }
        }

        if (corrects.length === 0) {
          userAnswers[i].marked = 3;
        } else if ( corrects.filter(c => c.length === 2).length === correctAnswers[i][1].length) {
          userAnswers[i].marked = 1;
        } else {
          debugger
          userAnswers[i].marked = 2;
        }
      }

      userAnswers[i].push(userAnswers[i].marked);
      userAnswers[i].push(corrects);
      userAnswers[i].push(incorrects);
    }
  }

  return userAnswers;
}

function userAnswersToObject(response) {
  let answers = {};

  for (let i = 0; i < response.length; i++) {
    let id = response[i].question_id;
    let type_id = response[i].type_id;

    if (!answers[id]) {
      if (type_id === 1) {
        answers[id] = response[i].answer_text.split(",");
      } else if (type_id === 2) {
        answers[id] = response[i].answer_text
          .split(",")
          .map((a) => a.split("."));
      } else if (type_id === 3) {
        answers[id] = response[i].answer_text
          .split(" ")
          .map((a) => a.split("."));
      }
    }
  }

  return answers;
}

function correctAnswerstoObject(response) {
  let correctAnswers = {};

  for (let i = 0; i < response.length; i++) {
    let id = response[i].question_id;
    let type_id = response[i].type_id;

    if (!correctAnswers[id]) {
      if (type_id === 1 && response[i].is_correct_choice === 1) {
        correctAnswers[id] = [response[i].choice_id.toString()];
      } else if (type_id === 2) {
        correctAnswers[id] = [
          [response[i].sequence_id, response[i].correct_answer],
        ];
      } else if (type_id === 3) {
        correctAnswers[id] = response[i].correct_answers
          .split(" ")
          .map((a) => a.split("."));
      }
    } else {
      if (type_id === 1 && response[i].is_correct_choice === 1) {
        correctAnswers[id].push(response[i].choice_id.toString());
      } else if (type_id === 2) {
        correctAnswers[id].push([
          response[i].sequence_id,
          response[i].correct_answer,
        ]);
      }
    }
  }

  return correctAnswers;
}

function imageFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports = {
  checkPassword,
  hashPasswordAsync,
  cleanObject,
  getUserIdFromToken,
  mark,
  userAnswersToObject,
  correctAnswerstoObject,
  imageFilter
};
