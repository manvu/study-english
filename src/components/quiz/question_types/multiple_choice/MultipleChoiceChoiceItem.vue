<template>
  <div @click="selectOption" :class="optionClass">
    <a >
      <span :class="letterClass"
        ><p>{{ letter }}</p></span
      >
      <span
        ><p>{{ text }}</p></span
      >
    </a>
  </div>
</template>

<script>
const characters = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "J",
  9: "K",
  10: "L",
};

export default {
  props: ["id", "text", "selectedOption", "item"],
  computed: {
    letter() {
      return characters[this.id];
    },
    letterClass() {
      return {
        letter: true,
        "letter-selected": this.item.choice_id == this.selectedOption,
      };
    },
    optionClass() {
      return {
        option: true,
        "option-selected": this.item.choice_id == this.selectedOption
      }
    },
  },
  setup() {
    return {};
  },
  methods: {
    selectOption() {
      this.$emit("selectOption", this.item.choice_id);
    },
  },
};
</script>

<style scoped>
.option {
  width: 100%;
  height: 60px;
  background-color: #f4f7f7;
  cursor: pointer;
}
.option a span:nth-child(2) {
  display: inline-block;
}
.option a span:nth-child(2) p {
  margin: 25px 20px;
  font-family: sans-serif;
}
.option span {
  display: inline-block;
}

.option:hover {
  background-color: #e3eded !important;
}

.option-selected {
  background-color: #b7c6c6 !important;
}

.letter {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  text-align: center;
  margin: 5px 10px;
  border-radius: 50%;
  padding-bottom: 5px;
}
.letter p {
  color: white;
  font-family: arial;
  font-size: 16pt;
  line-height: 0;
  font-weight: 600;
  margin-top: 20px;
}

.letter-selected {
  background-color: #a127d5;
}

.borderme {
  border-top: solid 0.75pt #dedede;
}
</style>