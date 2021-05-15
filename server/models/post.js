const database = new (require("../config/database"))();

class PostModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db.executeQuery("SELECT * FROM discussion_post");
  }

  async findDetailed(id) {
    return await this.db.executeQuery(
      `SELECT (SELECT CONCAT(u.first_name, ' ', u.last_name)) as full_name, dp.created_at as posted_at, u.created_at as member_since, dp.content, 
      (SELECT COUNT(*) FROM discussion_thread dt1 WHERE dt1.user_id = u.user_id) as thread_count,
      (SELECT COUNT(*) FROM discussion_post dp1 WHERE dp1.user_id = u.user_id) as post_count
      FROM discussion_post dp JOIN user u ON dp.user_id = u.user_id
      WHERE dp.post_id = ${id}`
    );
  }

  async findMany(threadId) {
    return await this.db
      .executeQuery(`SELECT (SELECT CONCAT(u.first_name, ' ', u.last_name)) as full_name, dp.created_at as posted_at, u.created_at as member_since, dp.content, 
    (SELECT COUNT(*) FROM discussion_thread dt1 WHERE dt1.user_id = u.user_id) as thread_count,
    (SELECT COUNT(*) FROM discussion_post dp1 WHERE dp1.user_id = u.user_id) as post_count
    FROM discussion_post dp JOIN user u ON dp.user_id = u.user_id
    WHERE dp.thread_id = ${threadId}`);
  }

  async addOne(threadId, content, userId) {
    return await this.db.executeQuery(`
    INSERT INTO discussion_post(thread_id, content, user_id) 
    VALUES ('${threadId}', '${content}', '${userId}');
    `);
  }
}

module.exports = PostModel;