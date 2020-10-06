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
    iconList,
  } = props;

  const [isUpdate, setUpdate] = useState(!!lined);

  return (
    <ProjectLayoutContext.Provider value={{ lined }}>
      <div className={lined ? styles.lined : styles.cached}>
        <Headline {...{ id, href, title }} />
        {!lined && <Picture {...{ imgUrl }} />}
        {!lined && showDescription && <Description {...{ description }} />}
        <TechStack {...{ iconList }} />
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
