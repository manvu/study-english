const STRINGS = {
    AUTHENTICATION_FAILED: "Authentication failed.",
    AUTHENTICATION_SUCCEEDED: "Authentication succeeded.",
    REGISTERING_USER_FAILED: "Registering user failed.",
    YOUR_EMAIL_ALREADY_EXISTS: "Your email is already taken.",
    NO_SUCH_USER_EXISTS: "No such user exists.",
    PLEASE_CHECK_YOUR_PASSWORD: "Please check your password.",
    PLEASE_CHECK_YOUR_EMAIL: "Please check your email.",
    REGISTERING_USER_SUCCEEDED: "Registering user succeeded.",
    ACCESS_DENIED: "Access denied.",
    ACCESS_GRANTED: "Access granted.",
    UNKNOWN_PERMISSION: "Unknown permission.",
    ACCESS_DENIED_MESSAGE: "You do not have the privilege to perform this action",
    CANNOT_REGISTER_USER_WITH_EMAIL: email => `Cannot register user with email ${email}`
}

module.exports = STRINGS