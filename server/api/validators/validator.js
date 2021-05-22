module.exports = {
  validateEmail: function(email) {
    if (!email) {
      return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validatePassword: function(password) {
    if (!password) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }

    return true;
  },
  validateProfilePictureId: function(id) {
    if (id < 1) {
      return false;
    }
    return true;
  },
  validateGender: function(gender) {
    if (gender !== "U" && gender !== "M" && gender !== "F") {
      return false;
    }
    return true;
  },
  validateRoleId: function(roleId) {
    if (roleId !== "1" && roleId !== "2") {
      return false;
    }
    return true;
  },
  validateName: function(name) {
    if (name) {
      return true
    } else {
      return false
    }
  }
};
