<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Instruction</label>
    <div class="">
      <textarea
        name="instruction"
        id="instruction"
        rows="3"
        placeholder="Read the text below and think of the word which best fits each gap"
        v-model="instruction"
      ></textarea>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="paragraph-title">Paragraph Title</label>
    <input type="text" class="form-control" v-model="paragraphTitle" />
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
    <label class="control-label" for="active">Key Answer</label>
    <div v-if="items.length > 0">
      <gap-filling-choice-item
        v-for="item in items"
        :key="item.sequence_id"
        :id="item.sequence_id"
        :item="item"
        :mode="mode"
        @updateAnswer="updateAnswer"
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
    <button type="button" @click="save" class="ml-3 btn btn-primary">
      Save
    </button>
  </div>
</template>

<script>
import GapFillingChoiceItem from "./question_editor_item/GapFillingChoiceItem";

export default {
  props: ["item", "mode"],
  inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  components: {
    GapFillingChoiceItem,
  },
  watch: {},
  data() {
    return {
      question: this.mode === "create" ? "" : this.item.question,
      instruction: this.mode === "create" ? "" : this.item.instruction,
      isActive:
        this.mode === "create" ? "" : this.item.is_active === 1 ? "yes" : "no",
      paragraphTitle: this.mode === "create" ? "" : this.item.paragraph_title,
      currentGapNumber: 0,
      items: this.mode === "create" ? [] : this.item.content,
    };
  },
  methods: {
    createGap() {
      this.currentGapNumber += 1;
      this.question += `{${this.currentGapNumber}}`;
      this.items.push({
        sequence_id: this.currentGapNumber,
        correct_answer: "",
      });
    },
    updateAnswer(index, keyAnswer) {
      let gapItem = this.items.find((i) => i.sequence_id === index);
      gapItem.correct_answer = keyAnswer;
    },
    save() {
      if (this.mode === "create") {
        this.$store.dispatch("teacherStore/createQuestion", {
          typeId: 2,
          items: this.items,
          question: this.question,
          instruction: this.instruction,
          paragraphTitle: this.paragraphTitle,
          isActive: this.isActive === "yes" ? 1 : 0,
        });
      } else if (this.mode === "edit") {
        this.$store.dispatch("teacherStore/updateQuestion", {
          items: this.items,
          question: this.question,
          instruction: this.instruction,
          paragraphTitle: this.paragraphTitle,
          isActive: this.isActive === "yes" ? 1 : 0,
        });
      }
      this.$emit("close");
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