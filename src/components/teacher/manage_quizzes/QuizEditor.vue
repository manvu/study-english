<template>
  <div class="col-md-10">
    <h2>Selected Quiz: {{ quizId }}</h2>
    <div class="contact-form">
      <div class="form-group">
        <label class="control-label col-sm-6" for="courseName"
          >Course Name:</label
        >
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="courseName"
            placeholder="Enter Course Name"
            name="courseName"
            v-model="courseName"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="active">Active:</label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="active"
              value="yes"
              v-model="isActive"
            />
            <label class="form-check-label" for="active">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="active"
              value="no"
              v-model="isActive"
            />
            <label class="form-check-label" for="active">No</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-6" for="email">Time allowed</label>
        <div class="form-row col-sm-10">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <input
                type="number"
                class="form-control"
                id="timeAllowedInput"
                placeholder="30"
                v-model="timeAllowed"
              />
            </div>
            <div class="form-check">
              <label class="form-check-label"> minutes </label>
            </div>
          </div>
        </div>
      </div>
      <questions-list
        v-if="questions.length > 0"
        :questions="questions"
      ></questions-list>
      <div class="mt-2 mb-2" v-else>
        There is no question created for this quiz yet
      </div>
      <button
        @click="openQuestionEditorModal(null, 'create')"
        class="mb-3 btn btn-primary"
      >
        Add Question
      </button>
      <div class="form-group">
        <button type="button" class="btn btn-dark">Cancel</button>
        <button type="button" class="ml-3 btn btn-primary">Save</button>
      </div>
    </div>
  </div>
  <question-editor-modal
    v-if="showQuestionEditor"
    @close="openQuestionEditorModal"
    :question="editQuestion"
    :mode="questionEditorOpenMode"
  ></question-editor-modal>
</template>

<script>
import QuestionEditorModal from "./QuestionEditorModal.vue";
import QuestionsList from "./QuestionsList.vue";

export default {
  props: ["quiz", "mode"],
  provide() {
    return {
      openQuestionEditorModal: this.openQuestionEditorModal,
      closeQuestionEditorModal: this.closeQuestionEditorModal,
    };
  },
  components: { QuestionsList, QuestionEditorModal },
  data() {
    return {
      quizId: this.mode === "create" ? " New " : this.quiz.quiz_id,
      courseName: this.mode === "create" ? "" : this.quiz.course_name,
      isActive:
        this.mode === "create" ? "yes" : this.quiz.is_active ? "yes" : no,
      timeAllowed: this.mode === "create" ? 30 : this.quiz.time_allowed,
      questions: this.mode === "create" ? [] : this.quiz.questions,
      showQuestionEditor: false,
      questionEditorOpenMode: null,
    };
  },
  computed: {
    editQuestion() {
      return this.$store.getters["questionStore/getEditQuestion"];
    },
  },
  methods: {
    openQuestionEditorModal(questionId, mode) {
      this.questionEditorOpenMode = mode;

      if (mode === "edit") {
        this.$store
          .dispatch("questionStore/getQuestionForEdit", { questionId })
          .then((response) => {
            this.showQuestionEditor = true;
            this.editQuestion;
          });
      } else {
        this.showQuestionEditor = true;
        
      }
    },
    closeQuestionEditorModal() {
      this.showQuestionEditor = false;
    },
  },
};
</script>

<style scoped>
.contact {
  padding: 4%;
  height: 400px;
}
.col-md-3 {
  background: #ff9b00;
  padding: 4%;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.contact-info {
  margin-top: 10%;
}

.col-md-9 {
  background: #fff;
  padding: 3%;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.contact-form label {
  font-weight: 600;
}
.contact-form button {
  color: #fff;
  font-weight: 600;
  width: 25%;
}
</style>