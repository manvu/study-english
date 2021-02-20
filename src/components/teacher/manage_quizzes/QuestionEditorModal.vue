<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Question Editor</h2>
            <h2 class="closeButton" @click="closeQuestionEditorModal()">X</h2>
          </div>

          <div class="modal-body">
            <div class="contact-form">
              <div class="form-group">
                <label class="control-label" for="type">Type</label>
                <div>
                  <select name="type" class="col-4 form-control" id="question-type" v-model="selectedQuestionType" >
                    <option class="dropdown-item" href="#" value="Multiple Choice"> Multiple Choice </option>
                    <option class="dropdown-item" href="#" value="Gap Filling"> Gap-filling </option>
                    <option class="dropdown-item" href="#" value="Matching"> Matching </option>
                  </select>
                </div>
              </div>
              <multiple-choice-editor v-if="selectedQuestionType === 'Multiple Choice'"></multiple-choice-editor>
              <gap-filling-editor v-else-if="selectedQuestionType === 'Gap Filling'"></gap-filling-editor>
              <matching-editor v-else-if="selectedQuestionType === 'Matching'"></matching-editor>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import GapFillingEditor from './question_editor/GapFillingEditor.vue';
import MatchingEditor from './question_editor/MatchingEditor.vue';
import MultipleChoiceEditor from "./question_editor/MultipleChoiceEditor";

export default {
  inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  props: ["question", "mode"],
  components: { MultipleChoiceEditor, GapFillingEditor, MatchingEditor },
  data() {
    return {
      selectedQuestionType: this.mode === "create" ? "Multiple Choice" : this.question.type_name,
    };
  },
  created() {
    console.log(this.question)
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  transition: opacity 0.3s ease;
  overflow: auto;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 55%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.col-md-3 {
  background: #ff9b00;
  padding: 4%;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
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

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .modal-container {
    width: 95%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .modal-container {
    width: 85%;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .modal-container {
    width: 75%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .modal-container {
    width: 65%;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .modal-container {
    width: 55%;
  }
}

.closeButton {
  cursor: pointer;
}
</style>