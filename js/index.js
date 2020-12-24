new fullScroll({
  mainElement: "main",
  displayDots: true,
  dotsPosition: "left",
  animateTime: 0.7,
  animateFunction: "ease"
});

var bkgGradient = new Granim({
  element: "#bkg-gradient",
  direction: "left-right",
  isPausedWhenNotInView: false,
  states: {
    "default-state": {
      //turquoise flow, atlas, pre-dawn, shore
      gradients: [
        ["#136A8A", "#267871"],
        ["#FEAC5E", "#C779D0"],
        ["#FFA17F", "#00223E"],
        ["#70E1F5", "#FFD194"]
      ]
    }
  }
});

/*var boxGradient = new Granim({
  element: "#center-text-canvas",
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
});*/
