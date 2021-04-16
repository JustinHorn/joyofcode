/// <reference types="react-scripts" />

interface Tag {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Like {
  id: number;
  user: {
    id: number;
  };
}

interface TechIcon {
  id: number;
  name: string;
  filetype: string;
  backgroundSize: string;
  location: string;
}
