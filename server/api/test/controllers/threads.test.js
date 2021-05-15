const { expect } = require("chai");
const STRINGS = require("../../../config/strings");
const threadsController = require("../../controllers/threads");

describe("ThreadsController: CreateThread", () => {
  it(`Should log ${STRINGS.THREAD_TITLE_MUST_BE_AT_LEAST_20_CHARACTERS}`, async () => {
    const data = {
      email: "abc",
      password: "",
      gender: "M",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await threadsController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.PLEASE_CHECK_YOUR_EMAIL);
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.THREAD_DESCRIPTION_CANNOT_BE_LEFT_BLANK}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "",
      gender: "M",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await threadsController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.PASSWORD_MUST_BE_AT_LEAST());
    expect(actual.response).to.equal(null);
  })

  it(`Should log ${STRINGS.SELECT_RELATED_QUIZ_CANNOT_BE_LEFT_BLANK}`, async () => {
    const data = {
      email: "abc@gmail.com",
      password: "123456890",
      gender: "P",
      profilePictureId: "1",
      roleId: "2"
    }

    const actual = await threadsController.register(data);
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

    const actual = await threadsController.register(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.INVALID_PROFILE_PICTURE_ID);
    expect(actual.response).to.equal(null);
  })
})

describe("ThreadsController: GetThread", () => {
  it(`Should log ${STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK}`, async () => {
    const data = {
      email: "",
      password: "123456f",
    };
    const actual = await threadsController.login(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK);
    expect(actual.response).to.equal(null);
  });
});

describe("ThreadsController: getThreads", () => {
  it(`Should log ${STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK}`, async () => {
    const data = {
      email: "",
      password: "123456f",
    };
    const actual = await threadsController.login(data);
    expect(actual.statusCode).to.equal(400);
    expect(actual.error).to.equal(STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK);
    expect(actual.response).to.equal(null);
  });
});


