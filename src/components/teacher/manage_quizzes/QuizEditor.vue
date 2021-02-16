<template>
  <div class="col-md-9">
    <h2>Selected Quiz: Quiz 2</h2>
    <div class="contact-form">
      <div class="form-group">
        <label class="control-label col-sm-3" for="fname">Course Name:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="fname" placeholder="Enter Course Name" name="fname" />
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="active">Active:</label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="active" value="yes" />
            <label class="form-check-label" for="active">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="active" value="no" />
            <label class="form-check-label" for="active">No</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2" for="email">Time allowed</label>
        <div class="form-row col-sm-10">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <input type="number" class="form-control" id="timeAllowedInput" placeholder="30" defaultValue="30"
              />
            </div>
            <div class="form-check">
              <label class="form-check-label"> minutes </label>
            </div>
          </div>
        </div>
      </div>
      <questions-list></questions-list>
      <button @click="toggleQuestionEditor" class="mb-3 btn btn-primary">Add Question</button>
      <div class="form-group">
        <button type="button" class="btn btn-dark">Cancel</button>
        <button type="button" class="ml-3 btn btn-primary">Save</button>
      </div>
    </div>
  </div>
  <question-editor-modal v-if="showQuestionEditor" @close="toggleQuestionEditor"></question-editor-modal>
</template>

<script>
import QuestionEditorModal from "./QuestionEditorModal.vue";
import QuestionsList from "./QuestionsList.vue";

export default {
  provide() {
    return {
      closeQuestionEditorModal: this.toggleQuestionEditor
    }
  },
  components: { QuestionsList, QuestionEditorModal },
  data() {
    return {
      showQuestionEditor: false
    }
  },
  methods: {
    toggleQuestionEditor() {
      this.showQuestionEditor = !this.showQuestionEditor 
    }
  }
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