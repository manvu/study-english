const { expect } = require("chai");
const STRINGS = require("../../misc/strings");
const authController = require("../controllers/auth");

describe("AuthController: Register", () => {
  it(`Should log ${STRINGS.PLEASE_CHECK_YOUR_EMAIL}`, async () => {
    const data = {
      email: "abc",
      password: "",
      gender: "M",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.PLEASE_CHECK_YOUR_EMAIL);
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.PASSWORD_MUST_BE_AT_LEAST()}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "",
      gender: "M",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.PASSWORD_MUST_BE_AT_LEAST());
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.INVALID_GENDER}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "123456890",
      gender: "P",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.INVALID_GENDER);
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.INVALID_PROFILE_PICTURE_ID}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "123456890",
      gender: "M",
      profilePictureId: "0",
      roleId: "2"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.INVALID_PROFILE_PICTURE_ID);
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.INVALID_ROLE_ID}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "123456890",
      gender: "M",
      profilePictureId: "1",
      roleId: "3"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.INVALID_ROLE_ID);
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.CANNOT_REGISTER_USER_WITH_EMAIL()}`, async () => {
    const data = {
      email: "test@gmail.com",
      password: "123456890",
      gender: "M",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await authController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.CANNOT_REGISTER_USER_WITH_EMAIL(data.email));
    expect(actual.response).to.equal(null);
  })
})

describe("AuthController: Login", () => {
  it(`Should log ${STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK}`, async () => {
    const data = {
      email: "",
      password: "123456f",
    };
    const actual = await authController.login(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK);
    expect(actual.response).to.equal(null);
  });

  it(`Should log ${STRINGS.PLEASE_CHECK_YOUR_EMAIL}`, async () => {
    const data = {
      email: "test@gmail.cofm",
      password: "123456f",
    };
    const actual = await authController.login(data);
    expect(actual.statusCode).to.equal(401);
    expect(actual.error).to.equal(STRINGS.PLEASE_CHECK_YOUR_EMAIL);
    expect(actual.response).to.equal(null);
  });

  it(`Should log ${STRINGS.PLEASE_CHECK_YOUR_PASSWORD}`, async () => {
    const data = {
      email: "test@gmail.com",
      password: "123456f",
    };
    const actual = await authController.login(data);
    expect(actual.statusCode).to.equal(401);
    expect(actual.error).to.equal(STRINGS.PLEASE_CHECK_YOUR_PASSWORD);
    expect(actual.response).to.equal(null);
  });

  it(`Should return status code 200 and token`, async () => {
    const data = {
      email: "test@gmail.com",
      password: "123456",
    };
    const actual = await authController.login(data);
    
    expect(actual.statusCode).to.equal(200);
    expect(actual.error).to.equal(null);
    expect(actual.response.token.length).to.greaterThan(10);
  });
});
