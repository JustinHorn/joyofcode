/*This file manages the sizing for items. The items are just stored as string name in db and then associated with logos on the server*/

const location = "/img/icons/";

let id: number = 1;

class IconClass implements TechIcon {
  id: number;
  name: string;
  filetype: string;
  backgroundSize: string;
  location: string;

  constructor(name: string, filetype = "png", backgroundSize = "contain") {
    this.id = id++;
    this.name = name;
    this.filetype = filetype;
    this.backgroundSize = backgroundSize;
    this.location = location + name + "." + filetype;
  }
}

export const NoIcon: TechIcon = {
  id: -1,
  name: "",
  filetype: "",
  backgroundSize: "",
  location: "",
};

const iconList: TechIcon[] = [
  new IconClass("apollo", "png", "120%"),
  new IconClass("graphql", "svg"),

  new IconClass("prisma", "png"),
  new IconClass("nodejs", "png", "150%"),
  new IconClass("angular", "svg"),
  new IconClass("reactjs", "svg", "160%"),
  new IconClass("mongodb", "png", "120%"),
  new IconClass("bootstrap", "svg", "120%"),
  new IconClass("sql", "png"),
  new IconClass("html5", "png", "110%"),
  new IconClass("css3", "svg", "150%"),
  new IconClass("javascript", "png"),
  new IconClass("firebase", "svg"),
  new IconClass("python", "svg"),
  new IconClass("java", "png"),
  new IconClass("flask", "png"),
  new IconClass("contentful", "png"),
  new IconClass("golang", "svg"),
  new IconClass("php", "svg", "130%"),
  new IconClass("clojure", "svg"),
  new IconClass("deno", "png"),
  new IconClass("nextjs", "svg", "100%"),
  new IconClass("material-ui", "svg"),
  new IconClass("typescript", "webp"),
];

export default iconList;
