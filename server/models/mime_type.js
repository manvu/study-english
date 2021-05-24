const database = new (require("../config/database"))();

class MimeTypeModel {
  constructor() {
    this.db = database;
  }

  async addOne({ image_url, image_alt }) {
    return await this.db.executeQuery(`
    INSERT INTO mime_type (image_url, image_alt)
    VALUES ('${image_url}', '${image_alt}')`)
  }

  async findOne(instruction) {
    return await this.db.executeQuery(`SELECT instruction_id FROM question_instruction WHERE instruction = '${instruction}'`)
  }
}

module.exports = MimeTypeModel;