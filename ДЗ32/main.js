import { Bus } from "./bus.js";
import { StopList } from "./stoplist.js";
import { Alert } from "./modal.js";
import { Prompt } from "./modal.js";

const bus = new Bus(50);
const goButton = document.getElementById("go");
goButton.setAttribute("disabled", "disabled");
let stopList;

const moveBusToNextStop = async () => {
  if (!bus.isFinished()) {
    const result = await bus.go();
    bus.busElement.style.left = `${stopList.nodes[bus.currentStop - 1].offsetLeft - bus.busElement.clientWidth / 2}px`;

    return new Promise((resolve) => {
      setTimeout(() => {
        const alertModal = new Alert();
        alertModal.show(result);
        resolve();
      }, 1000);
    });
  }
};

goButton.addEventListener("click", async () => {
  goButton.setAttribute("disabled", "disabled");
  for (let i = 0; i < stopList.nodes.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await moveBusToNextStop();
  }
  bus.finish();
  goButton.removeAttribute("disabled");
});

const newRouteButton = document.getElementById("newRoute");

newRouteButton.addEventListener("click", async () => {
  const promptModal = new Prompt();
  promptModal.show("Введите количество остановок:", async (numberOfStops) => {
    const roadElement = document.getElementById("road");
    const roadLength = roadElement.clientWidth;
    roadElement.querySelectorAll(".stop").forEach((stop) => stop.remove());

    stopList = new StopList(roadLength, parseInt(numberOfStops));
    stopList.nodes.forEach((stop) => roadElement.appendChild(stop));

    bus.busElement.style.left = `${stopList.nodes[0].offsetLeft - bus.busElement.clientWidth / 2}px`;
    goButton.removeAttribute("disabled");

    bus.setRoute(stopList.route);
  });
});