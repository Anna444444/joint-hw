export class StopList {
  constructor(roadLength, numberOfStops) {
    this.route = [];
    this.nodes = [];

    for (let i = 0; i < numberOfStops; i++) {
      this.route.push(parseFloat((Math.random() * 4 + 1).toFixed(1)));
    }
    const distanceBetweenStops = roadLength / (numberOfStops + 1);
    let currentDistance = distanceBetweenStops;

    for (let i = 0; i < numberOfStops; i++) {
      const stop = document.createElement("img");
      stop.src = "img/bus-stop-icon.png";
      stop.classList.add("stop");
      stop.style.left = `${currentDistance}px`;
      stop.style.top = "50px";
      stop.style.width = "80px";
      this.nodes.push(stop);
      currentDistance += distanceBetweenStops;
    }
  }
}
