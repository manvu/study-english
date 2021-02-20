<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Instruction</label>
    <div class="">
      <textarea
        name="instruction"
        id="instruction"
        rows="3"
        placeholder="Read the text below and think of the word which best fits each gap"
      ></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="label-button-group">
      <label class="control-label" for="question">Question</label>
      <button @click="createGap" class="mb-3 btn btn-primary">
        Create Gap
      </button>
    </div>
    <div class="">
      <textarea
        name="question"
        id="question"
        rows="3"
        v-model="question"
      ></textarea>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="active">Active</label>
    <div class="">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="active"
          value="yes"
          checked
        />
        <label class="form-check-label" for="active">Yes</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="active" value="no" />
        <label class="form-check-label" for="active">No</label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="active">Key Answer</label>
    <div v-if="items.length > 0">
      <gap-filling-choice-item
      v-for="(gap, id) in items" :key="id"
        :id="id"
        @updateKeyAnswer="updateAnswer"
      ></gap-filling-choice-item>
    </div>
    <div v-else>There is no gap created for this question</div>
  </div>
  <div class="form-group">
    <button
      type="button"
      @click="closeQuestionEditorModal()"
      class="btn btn-dark"
    >
      Cancel
    </button>
    <button type="button" @click="$emit('close')" class="ml-3 btn btn-primary">
      Save
    </button>
  </div>
</template>

<script>
import GapFillingChoiceItem from "./question_editor_item/GapFillingChoiceItem";

export default {
    inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  components: {
    GapFillingChoiceItem,
  },
  watch: {},
  data() {
    return {
      question: "",
      currentGapNumber: 1,
      items: [],
    };
  },
  methods: {
    createGap() {
      this.question += `{${this.currentGapNumber}}`;
      this.currentGapNumber += 1;
      this.items.push("");
    },
    updateAnswer(index, keyAnswer) {
      this.items[index] = keyAnswer;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: 600;
}

#instruction,
#question {
  width: 100%;
}

.label-button-group {
  display: flex;
  justify-content: space-between;
}

button {
  font-weight: 600;
  width: 25%;
}
</style>