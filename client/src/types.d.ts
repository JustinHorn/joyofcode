/// <reference types="react-scripts" />

interface Project {
  id: number;
  title: string;
  href: string;
  date: string;
  imgUrl: string;
  github: string;
  description: string;
  commentCount: number;
  likes: Like[];
  postedBy: User;
  tags: Tag[];
  techTags: string[];
}

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

interface Comment {
  id: number;
  text: string;
  date: number;
  postedBy: User;
}
