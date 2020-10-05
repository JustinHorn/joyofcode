import React, { useContext, useState } from "react";

import styles from "./project.module.css";

import PostInfoProject from "component/postInfo/Project";

import TagsAndMutations from "section/TagsAndMutations";

import Picture from "component/Project/Picture";

import Description from "component/Project/Description";

import Headline from "component/Project/Headline";

import Socials from "./Socials";

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
    small,
  } = props;

  const [isUpdate, setUpdate] = useState(!!small);

  return (
    <ProjectLayoutContext.Provider value={{ small }}>
      <div className={small ? styles.small : styles.normal}>
        <Headline {...{ id, href, title }} />
        {!small && <Picture {...{ imgUrl }} />}
        {!small && showDescription && <Description {...{ description }} />}

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
