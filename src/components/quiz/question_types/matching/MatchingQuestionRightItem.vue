<template>
  <p>{{id}} . {{ item.item }}</p>
</template>

<script>
export default {
  props: ["id","item"],
};
</script>

<style scoped>
p {
    padding: 0;
    margin: 0;
    font-size: 14pt;
}
</style>