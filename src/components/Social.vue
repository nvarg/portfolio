<template>
  <div class="social">
    <a
      v-for="social, idx in socials"
      :key="idx"
      :href="social.link"
      class="social__link"
    >
      <img
        :src="social.image"
        :height="size"
        class="social__link__image"
      />
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component
export default class Social extends Vue {
  @Prop() socials!: { image: string; link: string }[];

  @Prop() size!: number;
}
</script>

<style lang="scss">
.social {
  position: fixed;
  display: flex;
  flex-direction: column;
  margin: 0.35em;
  z-index: 99;

  a + a {
    margin-top: 0.6em;
  }
}
</style>
