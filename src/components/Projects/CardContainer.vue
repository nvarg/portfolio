<template>
  <div class="card-container">
    <Card class="card-container__card" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from './Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class App extends Vue { }
</script>

<style lang="scss">
.card-container {
  display: flex;
  justify-content: center;
  margin: auto;

  &__prev,
  &__next {
    flex-basis: 5vw;
    text-align: center;
  }

  &__card {
    flex-basis: 90vw;
  }
}
</style>
