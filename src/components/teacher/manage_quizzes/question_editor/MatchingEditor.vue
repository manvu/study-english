<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Instruction</label>
    <div class="">
      <textarea
        name="instruction"
        id="instruction"
        placeholder="Choose from the list for each question"
        rows="3"
        v-model="instruction"
      ></textarea>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="question">Question</label>
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
    <label class="control-label" for="active">Left Column</label>
    <div v-if="leftItems.length > 0">
      <matching-choice-left-item
        v-for="item in leftItems"
        :key="item.letter"
        :item="item"
        :availableOptions="rightItems"
        @update="updateLeftItem"
      ></matching-choice-left-item>
    </div>
    <div v-else>There is no item created for left column</div>
  </div>
  <button @click="addLeftItem" class="mb-3 btn btn-primary">Add Item</button>

  <div class="form-group">
    <label class="control-label" for="active">Right Column</label>
    <div v-if="rightItems.length > 0">
      <matching-choice-right-item
        v-for="item in rightItems"
        :key="item.letter"
        :item="item"
        @update="updateRightItem"
      ></matching-choice-right-item>
    </div>
    <div v-else>There is no item created for right column</div>
  </div>
  <button @click="addRightItem" class="mb-3 btn btn-primary">Add Item</button>
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
import MatchingChoiceLeftItem from "./question_editor_item/MatchingChoiceLeftItem";
import MatchingChoiceRightItem from "./question_editor_item/MatchingChoiceRightItem";

export default {
  components: {
    MatchingChoiceLeftItem,
    MatchingChoiceRightItem,
  },
  inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  props: ["item", "mode"],
  data() {
    return {
      leftItems: this.mode === "create" ? [] : this.item.content.leftItems,
      rightItems: this.mode === "create" ? [] : this.item.content.rightItems,
      currentAlphabeticCharacter: "@",
      currentNumericCharacter: 0,
      question: this.mode === "create" ? "" : this.item.question,
      instruction: this.mode === "create" ? "" : this.item.instruction,
      isActive:
        this.mode === "create" ? "" : this.item.is_active === 1 ? "yes" : "no",
    };
  },
  methods: {
    nextChar() {
      this.currentAlphabeticCharacter = String.fromCharCode(
        this.currentAlphabeticCharacter.charCodeAt(0) + 1
      );
      return this.currentAlphabeticCharacter;
    },
    addLeftItem() {
      this.currentNumericCharacter++;
      let index = this.currentNumericCharacter;

      this.leftItems.push({
        letter: index,
        item: "",
        correct_answer: null,
      });
    },
    addRightItem() {
      let index = this.nextChar();

      this.rightItems.push({
        letter: index,
        item: "",
      });
    },
    updateLeftItem(item) {
      let leftItem = this.leftItems.find((i) => i.letter === item.letter);
      leftItem.item = item.item;
      leftItem.correct_answer = item.correct_answer;
    },
    updateRightItem(item) {
      let rightItem = this.rightItems.find((i) => i.letter === item.letter);
      rightItem.item = item.item;
    },
    save() {
      
      if (this.mode === "create") {
        this.$store.dispatch("questionStore/createQuestion", {
          typeId: 3,
          items: { leftItems: this.leftItems, rightItems: this.rightItems },
          question: this.question,
          instruction: this.instruction,
          isActive: this.isActive === "yes" ? 1 : 0,
          correctAnswers: this.leftItems
            .reduce((string, current) => string + `${current.letter}.${current.correct_answer} `, "" ).trim(),
        });
      } else if (this.mode === "edit") {
        this.$store.dispatch("questionStore/updateQuestion", {
          items: { leftItems: this.leftItems, rightItems: this.rightItems },
          question: this.question,
          instruction: this.instruction,
          isActive: this.isActive === "yes" ? 1 : 0,
          correctAnswers: this.leftItems
            .reduce((string, current) => string + `${current.letter}.${current.correct_answer} `, "" ).trim(),
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

button {
  font-weight: 600;
  width: 25%;
}

#instruction,
#question {
  width: 100%;
}
</style>