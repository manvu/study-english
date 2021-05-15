const database = new (require("../config/database"))();

class ThreadModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db
      .executeQuery(`SELECT dt.subject, dt.thread_id, dt.content, dt.quiz_id, dt.user_id as thread_starter, 
    (SELECT COUNT(*) FROM discussion_post dp WHERE dp.thread_id = dt.thread_id) as replies,
    COALESCE(
    (SELECT dp.created_at FROM discussion_post dp WHERE dp.thread_id = dt.thread_id ORDER BY dp.created_at DESC LIMIT 1),
    (SELECT dt.created_at FROM discussion_thread dt1 WHERE dt1.thread_id = dt.thread_id)
    ) as last_activity
    FROM discussion_thread dt`);
  }

  async findOne(id) {
    return await this.db.executeQuery(
      `SELECT dt.thread_id, dt.subject, dt.content, dt.created_at, 
      (SELECT CONCAT(u.first_name, ' ', u.last_name)) as full_name,
            (SELECT COUNT(*) FROM discussion_thread dt1 WHERE dt1.user_id = u.user_id) as thread_count,
            (SELECT COUNT(*) FROM discussion_post dp1 WHERE dp1.user_id = u.user_id) as post_count,
            dt.is_deleted,
      u.created_at as member_since
      FROM discussion_thread dt JOIN user u ON dt.user_id = u.user_id
      WHERE dt.thread_id = ${id}`
    );
  }

  async addOne({ subject, content, userId, quizId }) {
    return await this.db.executeQuery(`
      INSERT INTO discussion_thread(subject, content, user_id, quiz_id) 
      VALUES ('${subject}', '${content}', '${userId}', '${quizId}');
      `);
  }
}

module.exports = ThreadModel;