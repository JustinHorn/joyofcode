import React, { useContext, useState } from "react";

import styles from "./project.module.css";

import PostInfoProject from "component/postInfo/Project";

import TagsAndMutations from "section/TagsAndMutations";

import Picture from "component/Project/Picture";

import Description from "component/Project/Description";

import Headline from "component/Project/Headline";

import Socials from "./Socials";

import TechStack from "./TechStack";

import ProjectLayoutContext from "context/ProjectLayout";

import iconList from "data";

const Project = (props) => {
  const {
    id,
    title,
    tags,
    href,
    postedBy,
    imgUrl,
    date,
    description,
    github,
    likes,
    preview,
    commentCount,
    showDescription,
    lined,
    techStack = [],
  } = props;

  const [isUpdate, setUpdate] = useState(!!lined);

  const icons = techStack.map((name) => iconList.find((i) => i.name === name));

  return (
    <ProjectLayoutContext.Provider value={{ lined }}>
      <div className={lined ? styles.lined : styles.cached}>
        <Headline {...{ id, href, title }} />
        {!lined && <Picture {...{ imgUrl }} />}
        {!lined && showDescription && <Description {...{ description }} />}
        <TechStack {...{ icons }} />
        <TagsAndMutations
          {...{
            id,
            tags,
            isUpdate,
            setUpdate,
            preview,
            github,
            postedBy,
          }}
        />
        <PostInfoProject
          {...{
            postedBy,
            date,
          }}
        />
        {!preview && <Socials {...{ id, commentCount, likes }} />}
      </div>
    </ProjectLayoutContext.Provider>
  );
};

export default Project;
