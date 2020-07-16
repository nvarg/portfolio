<template>
  <svg viewBox="0 0 1 1" preserveAspectRatio="xMidYMid meet" class="delaunay">
  <polygon
    v-for="triangle, idx in triangles"
    :key="`${idx}-triangle`"
    :points="asPoints(triangle)"
    fill="none"
    stroke="black"
    :stroke-width="1/1000"
  />
  <circle
    v-for="circle, idx in tweenedCircles"
    :key="`${idx}-circle`"
    :r="circle.size / 100"
    :cx="circle.point.x"
    :cy="circle.point.y"
  />
  </svg>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Delaunator from 'delaunator';
import { TimelineLite } from 'gsap';
import { randomCircles, pointsOfTriangle, Circle } from '@/utils/geometry';

@Component
export default class Delaunay extends Vue {
  @Prop() readonly n!: number

  @Prop() readonly xx!: [number, number]

  @Prop() readonly yy!: [number, number]

  @Prop({ default: () => [1 / 10000, 1] }) readonly rr!: [number, number]


  circles: Circle[] = randomCircles(this.n, [0.5, 0.5], [0.5, 0.5], this.rr);

  tweenedCircles: Circle[] = this.circles;

  mounted() {
    this.circles = randomCircles(this.n, this.xx, this.yy, this.rr);
  }

  @Watch('circles')
  tweenCircles() {
    const timeline = new TimelineLite({
      onComplete: () => {
        this.circles = randomCircles(this.n, this.xx, this.yy, this.rr);
      },
    });
    this.tweenedCircles.forEach(
      (target, idx) => timeline.to(target, {
        ease: 'sine.out',
        duration: 5,
        size: this.circles[idx].size,
      }, 'end').to(target.point, {
        ease: 'elastic.inOut(1, 0.5)',
        duration: 5,
        x: this.circles[idx].point.x,
        y: this.circles[idx].point.y,
      }, 'end'),
    );
  }

  get triangles(): [Circle, Circle, Circle][] {
    const d = Delaunator.from(this.tweenedCircles,
      (circle: Circle) => circle.point.x, (circle: Circle) => circle.point.y);
    return Array.from({ length: Math.floor(d.triangles.length / 3) },
      (_, i) => [
        ...pointsOfTriangle(d, i).map((p: number) => this.tweenedCircles[p]),
      ]) as [Circle, Circle, Circle][];
  }

  // eslint-disable-next-line class-methods-use-this
  asPoints(circles: Circle[]) {
    return circles.map((circle) => `${circle.point.x},${circle.point.y}`).join(' ');
  }
}
</script>

<style lang="scss">
.delaunay {
  & circle {
    fill: $clr-primary;
  }
}
</style>
