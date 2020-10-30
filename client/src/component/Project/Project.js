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

import { useLocation } from "react-router-dom";
import cn from "classnames";

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
    showDescription: isUpdate,
    techTags,
  } = props;

  const contextProps = useContext(ProjectLayoutContext);
  const lined = contextProps?.lined;

  const location = useLocation();

  const isProjectPage = location.pathname.includes("/project/") || isUpdate;

  let icons = techTags.map((name) => iconList.find((i) => i.name === name));

  if (!icons.length) {
    icons = ["nothing"];
  }
  return (
    <div
      className={cn({
        [cn("box-shadow ", lined ? "p-2" : "p-2r")]: !isProjectPage,
      })}
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
          {!preview && (
            <>
              <PostInfoProject
                {...{
                  postedBy,
                  date,
                }}
              />
              <Socials {...{ id, commentCount, likes }} />
            </>
          )}
        </div>
      </ProjectLayoutContext.Provider>
    </div>
  );
};

export default Project;
