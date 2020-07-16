<template>
  <section class="projects">
    <div class="projects__header">Projects</div>
    <Project
      v-for="project, idx in projects.slice(0, 3)"
      :key="idx"
      v-bind="project"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { ProjectInfo } from '@/models/Project';
import Project from './Project.vue';

@Component({
  components: {
    Project,
  },
})
export default class Projects extends Vue {
  projects: ProjectInfo[] = [];

  mounted() {
    axios.get('data/projects.json').then((response) => {
      this.projects = response.data as ProjectInfo[];
    });
  }
}
</script>

<style lang="scss">
.projects {
  &__header {
    font-weight: 900;
    font-size: 1.65em;
    margin-bottom: 1.95em;
  }
}
</style>
