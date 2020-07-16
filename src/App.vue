<template>
  <main id="app" class="app">
    <Social size="48" :socials="socials" class="app__socials" />
    <About id="about" class="app__about" />
    <Projects id="projects" class="app__projects" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Social from '@/components/Social.vue';
import About from '@/components/About/About.vue';
import Projects from '@/components/Projects/Projects.vue';

@Component({
  components: {
    Social, About, Projects,
  },
})
export default class App extends Vue {
  socials = [
    { link: 'https://github.com/nvarg', image: 'images/GitHub-64.png' },
    { link: 'https://linkedin.com/in/nvarg', image: 'images/LI-64.png' },
    { link: 'resume.pdf', image: 'images/resume-download.png' },
  ]
}
</script>

<style lang="scss">
html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $clr-bg;
  color: $clr-text;
  line-height: 1.3;
  margin: 0 0.25em 2.65em 0;
}

* {
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: column;

  &__navbar {
    width: 100%;
    position: fixed;
    top: 0;
  }

  &__projects,
  &__contact {
    max-width: 64em;
    margin: 0 auto;
    font-size: minmax(0.9rem, calc(0.2em + 0.7vw));
  }

  @media (max-width: 68.5rem) {
    &__projects,
    &__contact,
    &__about {
      margin-left: 3.5rem;
    }
  }
}

</style>
