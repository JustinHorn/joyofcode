const location = "/img/icons/";

let id = 1;

function IconClass(name, filetype = "png", backgroundSize = "contain") {
  this.id = id++;
  this.name = name;
  this.filetype = filetype;
  this.backgroundSize = backgroundSize;
  this.location = location + name + "." + filetype;
}

const iconList = [
  new IconClass("apollo", "png", "120%"),
  new IconClass("prisma", "png"),
  new IconClass("nodejs", "png", "150%"),
  new IconClass("angular", "svg"),
  new IconClass("react", "svg", "160%"),
  new IconClass("mongodb", "png", "120%"),
  new IconClass("bootstrap", "svg", "120%"),
  new IconClass("sql", "png"),
  new IconClass("html5", "png", "110%"),
  new IconClass("css3", "svg", "150%"),
  new IconClass("javascript", "png"),
];

export default iconList;
