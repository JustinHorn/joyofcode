import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import PostInfo from "Section/PostInfo";

import TagsAndMutations from "Section/TagsAndMutations";

import Picture from "component/Resource/Picture";

import Description from "component/Resource/Description";

import Headline from "component/Resource/Headline";

import CommentCounter from "component/CommentCounter";

import LikeHandler from "component/LikeHandler";

import { Link } from "react-router-dom";

const Resource = (props) => {
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
    isFeed,
  } = props;

  const [isUpdate, setUpdate] = useState(false);

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBody}>
        <Headline {...{ id, href, title }} />
        <Picture {...{ imgUrl }} />
        {!isFeed && <Description {...{ description }} />}
        <PostInfo
          {...{
            id,
            postedBy,
            date,
            likes,
            preview,
          }}
        />
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
        {!preview && (
          <div className={styles.socialAttributes}>
            <CommentCounter count={commentCount} projectId={id} />
            <LikeHandler likes={likes} resourceId={id} />
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resource;
