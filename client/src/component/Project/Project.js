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

import { useLocation } from "react-router-dom";

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
    lined,
    showDescription: isUpdate,
    techTags,
  } = props;

  const location = useLocation();

  const isProjectPage = location.pathname.includes("/project/") || isUpdate;

  let icons = techTags.map((name) => iconList.find((i) => i.name === name));

  if (!icons.length) {
    icons = ["nothing"];
  }

  return (
    <div
      className={!isProjectPage ? "box-shadow " + (lined ? "p-2" : "p-5") : ""}
    >
      <ProjectLayoutContext.Provider value={{ lined }}>
        <div className={lined ? styles.lined : styles.cached}>
          <Headline {...{ id, href, title }} />
          {!lined && <Picture {...{ id, imgUrl }} />}
          {!lined && isProjectPage && <Description {...{ description }} />}
          <TechStack {...{ icons }} />
          <TagsAndMutations
            {...{
              id,
              tags,

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
    </div>
  );
};

export default Project;
