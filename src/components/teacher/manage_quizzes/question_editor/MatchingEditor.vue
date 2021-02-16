<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Instruction</label>
    <div class="">
      <textarea name="instruction" id="instruction" rows="3"></textarea>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label" for="question">Question</label>
    <div class="">
      <textarea name="question" id="question" rows="3"></textarea>
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
    <label class="control-label" for="active">Left Column</label>
    <div v-if="leftItems.length > 0">
    <matching-choice-left-item
      v-for="item in leftItems"
      :key="item.id"
      :id="item.id"
      :item="item.item"
      :matchingItem="item.matchingItem"
      :availableOptions="rightItems"
    ></matching-choice-left-item>
    </div>
    <div v-else>There is no item created for left column</div>
  </div>
  <button @click="addLeftItem" class="mb-3 btn btn-primary">Add Item</button>

  <div class="form-group">
    <label class="control-label" for="active">Right Column</label>
    <div v-if="rightItems.length > 0">
    <matching-choice-right-item v-for="item in rightItems" :key="item.id" :id="item.id" :item="item.item"
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
    <button type="button" @click="$emit('close')" class="ml-3 btn btn-primary">
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
  inject: ["closeQuestionEditorModal"],
  props: ["choices"],
  data() {
    return {
      leftItems: [],
      rightItems: [],
      currentAlphabeticCharacter: "@",
      currentNumericCharacter: 0,
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
        id: index,
        item: "",
        matchingItem: null,
      });

      debugger;
    },
    addRightItem() {
      let index = this.nextChar();

      this.rightItems.push({
        id: index,
        item: "",
      });
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