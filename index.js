var granimInstance = new Granim({
  element: "#bkg-gradient",
  direction: "left-right",
  isPausedWhenNotInView: false,
  states: {
    "default-state": {
      //turquoise flow, atlas, pre-dawn, shore
      gradients: [
        ["#136A8A", "#267871"],
        [
          { color: "#FEAC5E" },
          { color: "#C779D0" }
        ],
        ["#FFA17F", "#00223E"],
        ["#70E1F5", "#FFD194"]
      ]
    }
  }
});