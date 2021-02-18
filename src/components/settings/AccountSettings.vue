<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
      <div class="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <div class="quiz-result">
          <div class="quiz-result-header">
            <div class="left-column">
              <h1>Account Settings</h1>
            </div>
          </div>
          <div class="detailed-result">
            <div class="row">
              <div
                class="question-wrapper col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"
              >
                <div class="form-group">
                  <label class="control-label" for="email">Email Address</label>
                  <div class="">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email Address is required"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="firstName"
                    >First Name</label
                  >
                  <div class="">
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      name="firstName"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="lastName">Last Name</label>
                  <div class="">
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      name="lastName"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="password">Password</label>
                  <div class="">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="confirmPassword"
                    >Confirm Password</label
                  >
                  <div class="">
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
    </div>
  </div>
</template>

<script>
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default {
  //   components: { FontAwesomeIcon },
  computed: {
    // faCheckCircle() {
    //   return faCheckCircle;
    // },
    // faTimesCircle() {
    //   return faTimesCircle;
    // },
  },
};
</script>

<style scoped>
h1,
h3,
p,
ol {
  font-family: sans-serif;
}

h2 {
  font-size: 12pt;
  font-weight: 300;
  margin: 0;
  line-height: 0;
}

.quiz-result {
  width: 100%;
  height: auto;
  background-color: #eceeef;
  /* position: relative;
  top: 50%;
  left: 50%; */
  border-radius: 5px;
  /* transform: translate(50%, 0%); */
  -webkit-box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
}
.quiz-result h1 {
  text-align: center;
}

.quiz-result-header {
  width: 100%;
  height: auto;
  background-color: #dddddd;
  white-space: initial;
  overflow: auto;
  padding: 20px;
  color: #1c1c1c;
}

@media screen and (max-width: 400px) {
  .question h3 {
    padding-top: 0px;
  }
}

@media (max-width: 768px) {
  .quiz-result {
    width: 100%;
  }
}

.instruction {
  font-weight: bold;
}

.wrapper {
  display: flex;
  justify-content: center;
}

.detailed-result {
  padding: 25px;
}

.detailed-result label {
  font-weight: bold;
}

table {
  width: 100%;
  height: 100%;
}

td {
  padding: 15px;
}
button {
  width: 100%;
  font-weight: bold;
}
</style>