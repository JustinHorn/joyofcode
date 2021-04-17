/// <reference types="react-scripts" />

interface Tag {
  id: number;
  name: string;
}

interface Project {
  commentCount: number;
  date: string;
  description: string;
  github: string;
  href: string;
  id: number;
  imgUrl: string;
  likes: Like[];
  postedBy: User;
  tags: Tag[];
  techTags: TechIcon[];
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
