const database = new (require("../config/database"))();

class SkillModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db.executeQuery(`SELECT * FROM question_type`);
  }
}

module.exports = SkillModel;