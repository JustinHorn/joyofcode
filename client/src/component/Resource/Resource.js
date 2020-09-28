import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import PostInfo from "Section/PostInfo";

import TagsAndMutations from "Section/TagsAndMutations";

import ResourceUpdatePopup from "./ResourceUpdatePopup";

import CommentSection from "Section/Comment";

import Picture from "component/Resource/Picture";

import Description from "component/Resource/Description";

import Headline from "component/Resource/Headline";

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
  } = props;

  const [isUpdate, setUpdate] = useState(false);

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBody}>
        <Headline {...{ href, title }} />
        <Picture {...{ imgUrl }} />
        <Description {...{ description }} />
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
          <CommentSection resourceId={id} commentCount={commentCount} />
        )}
      </div>

      {!preview && (
        <ResourceUpdatePopup
          show={isUpdate}
          onClickAway={() => setUpdate(false)}
          resourceValues={props}
        />
      )}
    </div>
  );
};

export default Resource;
