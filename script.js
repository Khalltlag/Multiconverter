//dragElement(document.getElementById("placeholder"));
var jsonObj = {
  time: [
    {
      name: "second",
      scale: "1",
      prefix: "second",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "minute",
      scale: "60",
      prefix: "minute",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "hour",
      scale: 3600,
      prefix: "hour",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "day",
      scale: 86400,
      prefix: "day",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "datetime",
      scale: 1,
      prefix: "",
      system: "SI",
      metricprefix: false,
    },
  ],

  length: [
    {
      name: "metre",
      scale: 1,
      prefix: "metre",
      system: "SI",
      metricprefix: true,
    },
    {
      name: "mile",
      scale: 1609.34,
      prefix: "mile",
      system: "imperial",
      metricprefix: false,
    },
    {
      name: "nautical mile",
      scale: 1852,
      prefix: "nautical mile",
      system: "imperial",
      metricprefix: false,
    },
  ],

  mass: [
    {
      name: "gram",
      scale: 1,
      prefix: "gram",
      system: "CGS",
      metricprefix: true,
    },
    {
      name: "kilogram",
      scale: 1,
      prefix: "kilogram",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "bigmac",
      scale: 1,
      prefix: "McDonalds Bigmac in the year 2025",
      system: "SI",
      metricprefix: false,
    },
  ],

  // electric: [
  //   {
  //     name: "ampere",
  //     scale: 1,
  //     prefix: "ampere",
  //     system: "SI",
  //     metricprefix: true,
  //   },
  // ],

  temperature: [
    {
      name: "kelvin",
      scale: 1,
      prefix: "kelvin",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "celsius",
      scale: 1,
      prefix: "celsius",
      system: "SI",
      metricprefix: false,
    },
    {
      name: "rankine",
      scale: 1,
      prefix: "do not use this",
      system: "SI",
      metricprefix: false,
    },
  ],

  // substance: [
  //   {
  //     name: "mole",
  //     scale: 1,
  //     prefix: "mole",
  //     system: "SI",
  //     metricprefix: true,
  //   },
  // ],

  //luminosity: [
  //  {
  //    name: "candela",
  //    scale: 1,
  //    prefix: "candela",
  //    system: "SI",
  //    metricprefix: true,
  //  },
  //  {
  //    name: "candela",
  //    scale: 1,
  //    prefix: "candela",
  //    system: "SI",
  //    metricprefix: true,
  //  },
  //],
};

var number = document.getElementById("numberinput").value;
//dynamically create elements
var count = Object.keys(jsonObj.length).length;
//alert(count);

function initelements(objcollection) {
  //loop through every element and add them
  var container = document.getElementById("right");
  for (var i = 0; i < count; i++) {
    var obj = objcollection[i];
    var button =
      "<button class='number' id=\"" +
      obj.name +
      '"><input id="' +
      obj.name +
      'input" type="text" placeholder="..." oninput="Converter(this, ' +
      obj.scale +
      "), this.style.width = (this.value.length+1) + 'ch'\";>" +
      obj.prefix +
      "</input><div class='drag' id=" +
      obj.name +
      "header>↔</div></button>";
    //console.log(button);
    container.innerHTML += button;
  }
  descendents = document
    .getElementById("buttons")
    .getElementsByTagName("button");
  // gets all descendent of ancestor
  //console.log(descendents.length);
  for (i = 0; i < descendents.length; ++i) {
    e = descendents[i];
    //console.log(e);
    dragElement(document.getElementById(e.id));
  }
  //<div class='buttonheader' id=\"" +
  //    obj.name +
  //    'header"> Click here to move</div>
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  //console.log(document.getElementById(elmnt.id + "header"));
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    checkContainers();
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:

    elmnt.style.position = "absolute";
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  //this is basically dumb drag and drop
  function closeDragElement() {
    left = document.getElementById("left");
    right = document.getElementById("right");
    /* stop moving when mouse button is released:*/
    if (pos3 < window.innerWidth / 2) {
      left.append(elmnt);
    } else {
      right.append(elmnt);
    }
    checkContainers();
    elmnt.style.position = "";
    elmnt.style.top = "";
    elmnt.style.left = "";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function checkContainers() {
  //console.log(left.getElementsByTagName("button"));
  if (left.getElementsByTagName("button").length > 1) {
    console.log("did a thing");
    right.append(left.getElementsByTagName("button")[0]);
  }

  if (left.getElementsByTagName("button").length < 1) {
    left.append(right.getElementsByTagName("button")[0]);
  }
}
function Converter(object, scale) {
  descendents = document
    .getElementById("buttons")
    .getElementsByTagName("button");
  objectvalue = object.getElementById(object.id + "input").value;

  for (var i = 0; i < descendents.length; i++) {
    if (descendents[i] != object) {
      descendents[i].getElementById(descendents[i].id + "input");
    }
  }
}

//gets every element inside and removes all of them.
function KillChildren(parent, tag) {
  children = document.getElementById(parent).getElementsByTagName(tag);
  for (var i = 0; i < children.length; ) {
    children[i].remove();
  }
}
function setActive(id, obj) {
  var iconBar = document
    .getElementById("iconBar")
    .getElementsByClassName("iconBarButton");
  //remove green color from buttons
  for (var i = 0; i < iconBar.length; i++) {
    e = iconBar[i].classList.remove("active");
    //console.log("removed active from " + iconBar[i].innerHTML);
  }
  id.classList.add("active");

  //remove all prior elements
  KillChildren("buttons", "button");
  initelements(obj);
  checkContainers();
}

setActive(document.getElementById("length"), jsonObj.length);
