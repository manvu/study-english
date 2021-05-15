const database = new (require("../config/database"))();

class UserModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db.executeQuery("SELECT * FROM user");
  }

  async findOneById(id) {
    return await this.db.executeQuery(
      `SELECT user.email, user.first_name, user.last_name 
      FROM user WHERE user_id = ${id}`
    );
  }

  async findOneByEmail(email) {
    return await this.db.executeQuery(
      `SELECT user_id, role_id, password_hash, first_name, last_name FROM user WHERE email='${email}'`
    );
  }

  async addOne(email, passwordHash, passwordSalt, gender, roleId, profilePictureId ) {
    return await this.db
      .executeQuery(`INSERT INTO user(email, password_hash, password_salt, gender, role_id, profile_picture_id)  
    VALUES('${email}', '${passwordHash}', '${passwordSalt}', '${gender}', '${roleId}', '${profilePictureId}')`);
  }

  async saveOne(userId, email, firstName, lastName, passwordHash, passwordSalt) {
    if (passwordHash) {
        return this.db.executeQuery(`UPDATE user
        SET email = '${email}', first_name = '${firstName}', last_name = '${lastName}', password_salt = '${passwordSalt}', password_hash = '${passwordHash}'
        WHERE user_id = ${userId}`);
      } else {
        return this.db.executeQuery(`UPDATE user
        SET email = '${email}', first_name = '${firstName}', last_name = '${lastName}'
        WHERE user_id = ${userId}`);
      }
  }
}

module.exports = UserModel;