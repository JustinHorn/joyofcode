import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import PostInfoProject from "component/postInfo/Project";

import TagsAndMutations from "section/TagsAndMutations";

import Picture from "component/Resource/Picture";

import Description from "component/Resource/Description";

import Headline from "component/Resource/Headline";

import CommentCounter from "component/CommentCounter";

import LikeHandler from "component/LikeHandler";

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
    showDescription,
  } = props;

  const [isUpdate, setUpdate] = useState(false);

  return (
    <div className={styles.resource}>
      <Headline {...{ id, href, title }} />
      <Picture {...{ imgUrl }} />
      {showDescription && <Description {...{ description }} />}

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
      {!preview && (
        <div className={styles.socialAttributes}>
          <CommentCounter count={commentCount} projectId={id} />
          <LikeHandler likes={likes} resourceId={id} />
          <span></span>
        </div>
      )}
    </div>
  );
};

export default Resource;
