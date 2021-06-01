const STRINGS = {
    EMAIL_AND_PASSWORD_CANNOT_BE_BLANK: "Email and password cannot be blank.",
    AUTHENTICATION_FAILED: "Authentication failed.",
    AUTHENTICATION_SUCCEEDED: "Authentication succeeded.",
    REGISTERING_USER_FAILED: "Registering user failed.",
    YOUR_EMAIL_ALREADY_EXISTS: "Your email is already taken.",
    NO_SUCH_USER_EXISTS: "No such user exists.",
    PLEASE_CHECK_YOUR_PASSWORD: "Incorrect password. Please check your password.",
    PASSWORD_MUST_BE_AT_LEAST: (characters = 8) => `password must be at least ${characters} characters.`,
    PLEASE_CHECK_YOUR_EMAIL: "Email is not associated with any user. Please check your email.",
    EMAIL_IS_NOT_IN_CORRECT_FORMAT: "Email is not in correct format. Please check your email.",
    REGISTERING_USER_SUCCEEDED: "Registering user succeeded.",
    ACCESS_DENIED: "Access denied.",
    ACCESS_GRANTED: "Access granted.",
    UNKNOWN_PERMISSION: "Unknown permission.",
    ACCESS_DENIED_MESSAGE: "You do not have the privilege to perform this action.",
    ERROR_OCCURRED: "Error occurred.",
    CANNOT_REGISTER_USER_WITH_EMAIL: (email = "$email") => `Email address is already taken - cannot register user with email ${email}`,
    THREAD_TITLE_MUST_BE_AT_LEAST_20_CHARACTERS: "Thread title must be at least 20 characters.",
    CONTENT_MUST_BE_AT_LEAST_30_CHARACTERS: "Content must be at least 30 characters.",
    THREAD_DESCRIPTION_CANNOT_BE_LEFT_BLANK: "Thread description cannot be left blank.",
    SELECT_RELATED_QUIZ_CANNOT_BE_LEFT_BLANK: "Select related quiz cannot be left blank.",
    CANNOT_LOAD_THREADS: "Cannot load threads.",
    CANNOT_LOAD_QUESTION: "Cannot load question.",
    CANNOT_LOAD_INSTRUCTION: "Cannot load instruction.",
    CANNOT_LOAD_QUIZ: "Cannot load quiz.",
    CANNOT_LOAD_POST: "Cannot load post.",
    CANNOT_CREATE_INSTRUCTION: "Cannot create instruction.",
    CANNOT_CREATE_POST: "Cannot create post.",
    CANNOT_CREATE_BLANK_QUESTION: "Cannot create blank question.",
    CANNOT_CREATE_QUESTION: "Cannot create question.",
    CANNOT_LOAD_STATISTICS: "Cannot load statistics.",
    INVALID_QUESTION_TYPE_ID: "Invalid question type id.",
    INVALID_QUESTION_ID: "Invalid question id.",
    INVALID_THREAD_ID: "Invalid thread id.",
    INVALID_POST_ID: "Invalid post id.",
    INVALID_INSTRUCTION_ID: "Invalid instruction id.",
    INVALID_PROFILE_PICTURE_ID: "Invalid profile picture id.",
    INVALID_GENDER: "Invalid gender.",
    INVALID_ROLE_ID: "Invalid role id.",
    INVALID_QUIZ_ID: "Invalid quiz id.",
    CANNOT_UPDATE_RATING: "Cannot update rating.",
    POST_CONTENT_CANNOT_BE_LEFT_BLANK: "Post content cannot be left blank.",
    CANNOT_SAVE_USER_INFO: "Cannot save user info.",
    ERROR_LOADING_TEACHER_PAGE: "Error loading teacher page.",
    PLEASE_CHECK_YOUR_FIRST_NAME: "Please check your first name.",
    PLEASE_CHECK_YOUR_LAST_NAME: "Please check your last name.",
    NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_OLD_PASSWORD_AND_AT_LEAST_8_CHARACTERS: "New password must be different from old password and at least 8 characters.",
    CANNOT_SAVE_NEW_PASSWORD: "Cannot save new password.",
    QUESTION_ITEMS_VALIDATION_ERROR: (questionTypeId) => {
        if (questionTypeId === 1) {
            return module.exports.MULTIPLE_CHOICE_MUST_HAVE_AT_LEAST_2_CHOICES
        } else if (questionTypeId === 2) {
            return module.exports.GAP_FILLING_QUESTION_MUST_HAVE_AT_LEAST_1_GAP
        } else if (questionTypeId === 3) {
            return module.exports.MATCHING_QUESTION_MUST_HAVE_AT_LEAST_2_OPTIONS_ON_BOTH_SIDES
        }
    },
    MULTIPLE_CHOICE_MUST_HAVE_AT_LEAST_2_CHOICES: "Multiple choice question must have at least 2 choices",
    GAP_FILLING_QUESTION_MUST_HAVE_AT_LEAST_1_GAP: "Gap filling question must have at least 1 gap",
    MATCHING_QUESTION_MUST_HAVE_AT_LEAST_2_OPTIONS_ON_BOTH_SIDES: "Matching question must have at least 2 options on both sides",
    INVALID_IS_ACTIVE_VALUE: "Invalid is active value.",
    TIME_ALLOWED_MUST_BE_AT_LEAST_1_MINUTE: "Time allowed must be at least 1 minute.",
    RATING_MUST_BE_BETWEEN_1_AND_5: "Rating must be between 1 and 5." 
}

module.exports = STRINGS