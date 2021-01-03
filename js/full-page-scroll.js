/**
 * Full page
 */
(function () {
  "use strict";

  /**
   * Full scroll main function
   */
  var fullScroll = function (params) {
    /**
     * Main div
     * @type {Object}
     */
    var main = document.getElementById(params.mainElement);

    /**
     * Sections divclass
     * @type {Array}
     */
    var sections = main.getElementsByTagName("section");

    /**
     * Full page scroll configurations
     * @type {Object}
     */
    var defaults = {
      container: main,
      sections: sections,
      animateTime: params.animateTime || 0.7,
      animateFunction: params.animateFunction || "ease",
      maxPosition: sections.length - 1,
      currentPosition: 0,
      displayNavbar:
        typeof params.displayNavbar != "undefined"
          ? params.displayNavbar
          : true,
    };

    var numberToId = {
      0: "top",
      1: "second-section",
      2: "third-section",
      3: "fourth-section",
      4: "fifth-section"
    };

    var idToNumber = {
      top: 0,
      "second-section": 1,
      "third-section": 2,
      "fourth-section": 3,
      "fifth-section": 4
    };

    this.defaults = defaults;
    this.numberToId = numberToId;
    this.idToNumber = idToNumber;

    /**
     * Init build
     */
    this.init();
  };

  /**
   * Init plugin
   */
  fullScroll.prototype.init = function () {
    this.buildPublicFunctions().buildSections().buildNavbar().addEvents();

    var anchor = location.hash.replace("#", "").split("/")[0];
    location.hash = "top";
    if (typeof anchor === "undefined") {
      this.changeCurrentPosition(this.idToNumber[anchor]);
    } else {
      this.changeCurrentPosition(0);
    }

    this.registerIeTags();
  };

  /**
   * Build sections
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.buildSections = function () {
    var sections = this.defaults.sections;
    for (var i = 0; i < sections.length; i++) {
      sections[i].setAttribute("data-index", i);
    }
    return this;
  };

  /**
   * Build dots navigation
   * @return {Object} this (fullScroll)
   */
  fullScroll.prototype.buildNavbar = function () {
    this.nav = document.createElement("nav");
    this.ul = document.createElement("ul");
    this.nav.appendChild(this.ul);

		this.nav.className = "navbar"
    this.ul.className = this.updateClass("concat", "items", this.ul.className);

    var _self = this;
    var sections = this.defaults.sections;

    for (var i = 0; i < sections.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");

      a.setAttribute("href", "#" + this.numberToId[i]);
      li.appendChild(a);
      _self.ul.appendChild(li);
    }

    this.ul.childNodes[0].firstChild.className = this.updateClass(
      "concat",
      "active",
      this.ul.childNodes[0].firstChild.className
    );

    console.log(this.ul.childNodes[0].firstChild.innerHTML);
    this.ul.childNodes[0].firstChild.innerHTML = "Section 1";
    this.ul.childNodes[1].firstChild.innerHTML = "Section 2";
    this.ul.childNodes[2].firstChild.innerHTML = "Section 3";

    if (this.defaults.displayNavbar) {
      document.body.appendChild(this.nav);
    }

    return this;
  };

  /**
   * Add Events
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.addEvents = function () {
    if (document.addEventListener) {
      document.addEventListener("mousewheel", this.mouseWheelAndKey, false);
      document.addEventListener("wheel", this.mouseWheelAndKey, false);
      document.addEventListener("keyup", this.mouseWheelAndKey, false);
      document.addEventListener("touchstart", this.touchStart, false);
      document.addEventListener("touchend", this.touchEnd, false);
      window.addEventListener("hashchange", this.hashChange, false);

      /**
       * Enable scroll if decive don't have touch support
       */
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        if (!("ontouchstart" in window)) {
          document.body.style = "overflow: scroll;";
          document.documentElement.style = "overflow: scroll;";
        }
      }
    } else {
      document.attachEvent("onmousewheel", this.mouseWheelAndKey, false);
      document.attachEvent("onkeyup", this.mouseWheelAndKey, false);
    }

    return this;
  };

  /**
   * Build public functions
   * @return {[type]} [description]
   */
  fullScroll.prototype.buildPublicFunctions = function () {
    var mTouchStart = 0;
    var mTouchEnd = 0;
    var _self = this;

    this.mouseWheelAndKey = function (event) {
      if (event.target.className == "scroll-box") return;
      if (event.deltaY > 0 || event.keyCode == 40) {
        _self.defaults.currentPosition++;
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      } else if (event.deltaY < 0 || event.keyCode == 38) {
        _self.defaults.currentPosition--;
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      }
      _self.removeEvents();
    };

    this.touchStart = function (event) {
			if (event.target.className == "scroll-box") return;
      mTouchStart = parseInt(event.changedTouches[0].clientY);
      mTouchEnd = 0;
    };

    this.touchEnd = function (event) {
			if (event.target.className == "scroll-box") return;
      mTouchEnd = parseInt(event.changedTouches[0].clientY);
      if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
        if (mTouchEnd > mTouchStart) {
          _self.defaults.currentPosition--;
        } else {
          _self.defaults.currentPosition++;
        }
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      }
    };

    this.hashChange = function (event) {
      if (location) {
        var anchor = location.hash.replace("#", "").split("/")[0];
        if (anchor !== "") {
          anchor = _self.idToNumber[anchor];
          if (anchor < 0) {
            _self.changeCurrentPosition(0);
          } else if (anchor > _self.defaults.maxPosition) {
            _self.changeCurrentPosition(_self.defaults.maxPosition);
          } else {
            _self.defaults.currentPosition = anchor;
            _self.animateScroll();
          }
        }
      }
    };

    this.removeEvents = function () {
      if (document.addEventListener) {
        document.removeEventListener(
          "mousewheel",
          this.mouseWheelAndKey,
          false
        );
        document.removeEventListener("wheel", this.mouseWheelAndKey, false);
        document.removeEventListener("keyup", this.mouseWheelAndKey, false);
        document.removeEventListener("touchstart", this.touchStart, false);
        document.removeEventListener("touchend", this.touchEnd, false);
      } else {
        document.detachEvent("onmousewheel", this.mouseWheelAndKey, false);
        document.detachEvent("onkeyup", this.mouseWheelAndKey, false);
      }

      setTimeout(function () {
        _self.addEvents();
      }, 300);
    };

    this.animateScroll = function () {
      var animateTime = this.defaults.animateTime;
      var animateFunction = this.defaults.animateFunction;
      var position = this.defaults.currentPosition * 100;

      this.defaults.container.style.webkitTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.mozTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.msTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.transition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.webkitTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.mozTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.msTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.transform =
        "translateY(-" + position + "%)";

      for (var i = 0; i < this.ul.childNodes.length; i++) {
        this.ul.childNodes[i].firstChild.className = this.updateClass(
          "remove",
          "active",
          this.ul.childNodes[i].firstChild.className
        );
        if (i == this.defaults.currentPosition) {
          this.ul.childNodes[i].firstChild.className = this.updateClass(
            "concat",
            "active",
            this.ul.childNodes[i].firstChild.className
          );
        }
      }
    };

    this.changeCurrentPosition = function (position) {
      if (position !== "") {
        if (position >= 0) {
          _self.defaults.currentPosition = position;
          location.hash = this.numberToId[_self.defaults.currentPosition];
        } else {
          _self.defaults.currentPosition = 0;
          location.hash = this.numberToId[0];
        }
      }
    };

    this.registerIeTags = function () {
      document.createElement("section");
    };

    this.updateClass = function (type, newClass, currentClass) {
      if (type == "concat") {
        if (currentClass.trim() === "") {
          return newClass;
        } else return (currentClass += " " + newClass);
      } else if (type == "remove") {
        return currentClass.replace(newClass, "");
      }
    };

    return this;
  };
  window.fullScroll = fullScroll;
})();
