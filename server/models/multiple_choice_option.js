const database = new (require("../config/database"))();

class MultipleChoiceOptionModel {
  constructor() {
    this.db = database;
  }

  async findMany(questionId) {
    return await this.db.executeQuery(`SELECT qmc.choice_id, qmc.choice_text, qmc.is_correct_choice
    FROM question q 
    JOIN question_multiple_choice qmc ON q.question_id = qmc.question_id
    WHERE q.question_id = ${questionId}`)
  }

  async addMany(items, questionId) {
    let query = `INSERT INTO question_multiple_choice (question_id, choice_id, choice_text, is_correct_choice) VALUES `;

    for (let i = 0; i < items.length; i++) {
      query = query.concat(
        `(${questionId}, ${items[i].choice_id}, '${items[i].choice_text}', '${items[i].is_correct_choice}'), `
      );
    }

    let formattedQuery = query.substring(0, query.length - 2);

    return await this.db.executeQuery(formattedQuery)
  }
}

module.exports = MultipleChoiceOptionModel;