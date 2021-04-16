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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Project = (props: any) => {
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

  let icons = techTags.map((name: string) =>
    iconList.find((i) => i.name === name)
  );

  if (!icons.length) {
    icons = ["nothing"];
  }

  const prop_string: string = styles.width;

  let cn_property: any = {};
  cn_property[prop_string] = !!lined;
  return (
    <div
      className={cn({
        [cn(
          "box-shadow ",
          lined ? "p-2" : "p-2r",
          cn_property
        )]: !isProjectPage,
      })}
    >
      <ProjectLayoutContext.Provider value={{ lined }}>
        <div className={lined ? styles.lined : styles.cached}>
          <Headline {...{ id, href, title, github }} />
          {!lined && <Picture {...{ id, imgUrl }} />}
          {!lined && isProjectPage && <Description {...{ description }} />}
          <TechStack {...{ icons }} />
          <TagsAndMutations
            {...{
              id,
              tags,

              preview,

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
