<template>
  <div class="mt-5">
    
    <div class="row">
      <div class="col-1 col-sm-1 col-md-2 col-lg-3 col-xl-3"></div>
      <div class="col-10 col-sm-10 col-md-8 col-lg-6 col-xl-6">
        <div class="quiz-result">
          <div class="quiz-result-header">
            <div class="left-column">
              <h1> <font-awesome-icon :icon="faUser"></font-awesome-icon> Account Settings</h1>
            </div>
          </div>
          <div class="detailed-result">
                       <div class="row py-4">
                <div class="col-lg-6 mx-auto">
                  <!-- Upload image input-->
                  <div
                    class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm"
                  >
                    <input
                      id="upload"
                      type="file"
                      onchange="readURL(this);"
                      class="form-control border-0"
                    />
                    <label
                      id="upload-label"
                      for="upload"
                      class="font-weight-light text-muted"
                      >Choose file</label
                    >
                    <div class="input-group-append">
                      <label
                        for="upload"
                        class="btn btn-light m-0 rounded-pill px-4"
                      >
                        <i class="fa fa-cloud-upload mr-2 text-muted"></i
                        ><small
                          class="text-uppercase font-weight-bold text-muted"
                          >Choose file</small
                        ></label
                      >
                    </div>
                  </div>

                  <!-- Uploaded image area-->
                  <p class="font-italic text-white">
                    The image uploaded will be rendered inside the box below.
                  </p>
                  <div class="image-area mt-4">
                    <img
                      id="imageResult"
                      src="#"
                      alt=""
                      class="img-fluid rounded shadow-sm mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
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
                      v-model="email"
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
                      v-model="firstName"
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
                      v-model="lastName"
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
                      v-model="password"
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
                      v-model="confirmPassword"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <button @click="save" class="btn btn-primary">Save</button>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


export default {
    components: { FontAwesomeIcon },
  props: ["email_address", "first_name", "last_name"],
  computed: {
    faUser() {
      return faUser;
    },
  },
  data() {
    return {
      email: this.email_address,
      firstName: this.first_name ? this.first_name : "",
      lastName: this.first_name ? this.last_name : "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    save() {
      this.$store
        .dispatch("settingStore/saveUserInfo", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        })
        .then((response) => {
          this.user = this.$store.getters["settingStore/getUser"];
        });
    },
  },
  created() {
    this.$store.dispatch("settingStore/fetchUserInfo", {}).then((response) => {
      this.user = this.$store.getters["settingStore/getUser"];

      this.email = this.user.email;
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
    });
  },
};
</script>

<style scoped>
#upload {
    opacity: 0;
}

#upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

.image-area {
    border: 2px dashed rgba(255, 255, 255, 0.7);
    padding: 1rem;
    position: relative;
}

.image-area::before {
    content: 'Uploaded image result';
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    z-index: 1;
}

.image-area img {
    z-index: 2;
    position: relative;
}
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