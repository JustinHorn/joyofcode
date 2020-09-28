import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import Url from "url-parse";

import PostInfo from "component/PostInfo";

import TagsAndMutations from "component/TagsAndMutations";

import ResourceUpdatePopup from "./ResourceUpdatePopup";

import CommentSection from "component/CommentSection";

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

const Picture = ({ imgUrl }) => (
  <div className={styles.imgContainer}>
    {imgUrl && <img className={styles.preview} src={imgUrl} />}
  </div>
);

const Description = ({ description }) => <p>{description || "---"}</p>;

const Headline = ({ href, title }) => {
  const hostname = new Url(href).hostname;

  return (
    <>
      <h2>{title}</h2>
      <h4>
        <a href={href}> ({hostname})</a>{" "}
      </h4>
    </>
  );
};

export default Resource;
