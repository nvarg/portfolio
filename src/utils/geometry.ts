import Delaunator from 'delaunator';

export interface Circle {
  point: Point;
  size: number;
}

interface Point {
  x: number;
  y: number;
}

function edgesOfTriangle(t: number) {
  return [3 * t, 3 * t + 1, 3 * t + 2];
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomPoints(n: number, xRange: [number, number], yRange: [number, number]): Point[] {
  return Array.from({ length: n }, () => ({ x: random(...xRange), y: random(...yRange) }));
}

export
function randomCircles(n: number,
  xRange: [number, number],
  yRange: [number, number],
  sizeRange: [number, number]): Circle[] {
  return randomPoints(n, xRange, yRange).map(
    (point) => ({ point, size: random(...sizeRange) }),
  );
}

export
function pointsOfTriangle(delaunay: Delaunator<Circle>, t: number) {
  return edgesOfTriangle(t)
    .map((e) => delaunay.triangles[e]);
}
