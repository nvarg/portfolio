<template>
  <div class="project">
    <div class="project__title">{{ title }}</div>
    <div
      v-on-view="{ callback: showTransition }"
      class="project__description"
    >
      <p v-for="paragraph in description" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>
    <img
      v-on-view="{ callback: showTransition }"
      :src="image"
      class="project__image"
    />
    <div class="project__tags">
      <div
        v-for="tag, idx in tags"
        :key="idx"
        class="project__tags__tag"
      >
        {{ tag }}
      </div>
    </div>
    <div class="project__links">
      <a
        v-for="(url, key) in urls"
        :key="key"
        :href="url"
      >
        {{ key }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ProjectInfo } from '@/models/Project';
import OnView from '@/directives/OnView';


@Component({
  directives: {
    OnView,
  },
})
export default class Project extends Vue implements ProjectInfo {
  @Prop({ required: true }) readonly title!: string;

  @Prop({ required: true }) readonly description!: string[];

  @Prop({ required: true }) readonly tags!: string[];

  @Prop() readonly image?: string | undefined;

  @Prop() readonly urls!: { [name: string]: string };

  mounted() {
    if (window.IntersectionObserver) {
      this.$el.querySelectorAll('.project__description, .project__image')
        .forEach((el) => {
          el.classList.add('project__hidden');
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  showTransition(el: Element) {
    el.classList.remove('project__hidden');
  }
}
</script>

<style lang="scss">
.project {
  display: grid;
  margin: auto;
  background-color: lighten($clr-bg, 8%);
  grid-template-columns: minmax(auto, 3fr) minmax(auto, 1fr);
  padding: 0.65em;
  max-width: calc(100% - 3.5rem);

  & + & {
    margin-top: 7.25em;
  }

  &__title {
    grid-area: 1/1/1/3;
    margin-bottom: 1.25em;
    margin-top: 0.65em;
    font-size: 1.25em;
  }

  &__description {
    grid-area: 3/1/3/3;
    z-index: 99;
    padding: 3em 2.5em;
    transition:
      transform 0.9s ease-out,
      opacity 0.5s ease-in;
  }

  &__image {
    grid-area: 2/1/2/3;
    filter: saturate(0.8) brightness(0.65);
    max-width: 100%;
    transition: opacity 1s ease-out;
  }

  &__tags {
    grid-area: 4/1/4/3;
    display: flex;
    margin-left: 2.5em;

    &__tag + &__tag {
      margin-left: 1.5ch;
    }
  }

  &__links {
    grid-area: 5/2/6/3;
    margin: 1.25em 0;
    display: flex;
    justify-content: flex-end;
    direction: ltr;
    justify-content: space-around;

    a {
      text-decoration: none;
      color: $clr-text;
      font-weight: 700;
      text-transform: capitalize;
    }

    a + a {
      margin-left: 2ch;
    }
  }

  &__tags,
  &__links {
    align-self: baseline;
  }

  @media screen and (min-width: 47rem) {
    grid-template-columns: 1fr 15ch 1fr;
    background-color: transparent;
    padding: 0;

    &:nth-child(odd) {
      direction: rtl;

      .project__tags__tag + .project__tags__tag {
        margin-right: 1.5ch;
      }

      .project__links {
        justify-content: flex-start;
      }

      .project__image {
        padding-right: 1.25em;
        padding-left: 0;
      }

      .project__hidden.project__description {
        transform: translateX(20%);
      }
    }

    &__hidden.project__description {
      transform: translateX(-20%);
    }

    &__hidden {
      opacity: 0;
    }

    &__title {
      grid-area: 1/1;
    }

    &__description {
      grid-area: 2/1/3/3;
      background-color: lighten($clr-bg, 8%);
      z-index: 5;

      p {
        margin: 0;
      }

      p + p {
        margin-top: 1em;
      }
    }

    &__image {
      padding-left: 1.25em;
      grid-area: 1/2/5/4;
    }

    &__tags {
      grid-area: 3/1;
      margin: 1em 0;
    }

    &__links {
      grid-area: 4/1/5/2;
      justify-self: end;

      a {
        text-transform: capitalize;
      }
    }
  }
}
</style>
