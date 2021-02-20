<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Instruction</label>
    <div class="">
      <textarea
        name="instruction"
        id="instruction"
        rows="3"
        placeholder="Choose the most suitable option to fill in the blank"
        v-model="instruction"
      ></textarea>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="question">Question</label>
    <div class="">
      <textarea name="question" id="question" rows="3" v-model="question"></textarea>
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
          v-model="isActive"
        />
        <label class="form-check-label" for="active">Yes</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="active" value="no" v-model="isActive" />
        <label class="form-check-label" for="active">No</label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="active">Choices</label>
    <div v-if="items.length > 0">
      <multiple-choice-item
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :item="item.item"
      ></multiple-choice-item>
    </div>
    <div v-else>There is no choice created for this question</div>
  </div>
  <button @click="addChoice" class="mb-3 btn btn-primary">Add Choice</button>
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
import MultipleChoiceItem from "./question_editor_item/MultipleChoiceItem";
export default {
  components: { MultipleChoiceItem },
  inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  props: ["item", "mode"],
  data() {
    return {
      items: [],
      currentAlphabeticCharacter: "@",
      question: this.mode === "create" ? "" : this.item.question,
      instruction: this.mode === "create" ? "" : this.item.instruction,
      isActive: this.mode === "create" ? "" : (this.item.is_active === 1 ? "yes" : "no"),
    };
  },
  methods: {
    nextChar() {
      this.currentAlphabeticCharacter = String.fromCharCode(
        this.currentAlphabeticCharacter.charCodeAt(0) + 1
      );
      return this.currentAlphabeticCharacter;
    },
    addChoice() {
      let index = this.nextChar();
      this.items.push({
        id: index,
        item: "",
      });
    },
  },
  created() {
    console.log(this.item)
  }
};
</script>

<style scoped>
label {
  font-weight: 600;
}

button {
  font-weight: 600;
  width: 25%;
}

#instruction,
#question {
  width: 100%;
}
</style>