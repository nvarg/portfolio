<template>
  <section class="about">
    <div class="about__heading">Hello,<br />I'm Natan</div>
    <div class="about__subheading">New Grad May 2020</div>
    <div class="about__subsubheading">Software Developer</div>
    <p class="about__text">
      Just graduated. I have an interest in <strong>software engineering</strong> and
      <strong>cloud</strong> technology
    </p>
    <Delaunay class="about__delaunay" :n="21" :xx="[1/1000, 0.95]" :yy="[1/1000, 0.95]" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Delaunay from './Delaunay.vue';

@Component({
  components: {
    Delaunay,
  },
})
export default class About extends Vue { }
</script>

<style lang="scss">
.about {
  display: grid;
  height: 100vh;
  place-items: center;
  grid-column-gap: 1.5em;
  grid-row-gap: 0.5em;
  position: relative;

  &__heading {
    grid-area: 1/1/3/1;
    justify-self: right;
    text-align: right;
    font-size: calc(0.5rem + 8vw);
    font-weight: bolder;
    color: $clr-primary;
  }

  &__subheading {
    grid-area: 1/2;
    justify-self: left;
    text-align: left;
    align-self: flex-end;
    font-size: calc(1rem + 2.5vw);
    font-weight: bold;
    color: $clr-primary;
  }

  &__subsubheading {
    grid-area: 2/2;
    justify-self: left;
    text-align: left;
    align-self: flex-start;
    font-size: calc(1rem + 1.5vw)
  }

  &__text {
    grid-area: 3/1/3/3;
    font-size: calc(1rem + 1vw);
    max-width: 38ch;
    text-align: center;
    align-self: start;
    margin: 0;
    transform: translateY(-50%);

    & strong {
      color: $clr-primary;
    }
  }

  & > * {
    z-index: 1;
  }

  &__delaunay {
    grid-area: 1/1/4/3;
    width: 100%;
    max-height: 100%;
    padding: 1.5em;
    z-index: 0;
    filter: saturate(0.6) invert(0.1) brightness(.40)
  }

  @media (orientation: portrait) {
    height: 65vh;

    &__text {
      transform: none;
    }
  }
}
</style>
