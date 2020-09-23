import React, { useContext, useState } from "react";

import styles from "./resource.module.css";

import Url from "url-parse";

import UserContext from "context";

import Popup from "component/Popup";

import { MutationOptions, useHandleFormValues } from "component/MutationForm";
import { updateOptions as options } from "component/MutationForm";
import { useUpdateResource } from "hooks";

import MutationMenu from "component/MutationMenu";

import PostInfo from "./PostInfo";

import TagsAndMutations from "./TagsAndMutations";

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

const Description = ({ description }) => <p>{description}</p>;

const Headline = ({ href, title }) => {
  const hostname = new Url(href).hostname;

  return (
    <h4>
      <a href={href}> {title} </a> ({hostname})
    </h4>
  );
};

const ResourceUpdatePopup = ({ resourceValues, show, onClickAway }) => {
  const { id } = resourceValues;
  const MO = new MutationOptions(options);

  const propsM = useHandleFormValues(MO.parseToResource(resourceValues));

  const { update: mutation } = useUpdateResource();

  const doMutation = ({ variables }) => {
    variables.id = id;
    mutation({ variables });
    onClickAway();
  };

  return (
    <Popup show={show} onClickAway={onClickAway}>
      <MutationMenu
        MO={MO}
        mutation={doMutation}
        headline={"Update your project"}
        props={propsM}
      />
    </Popup>
  );
};

export default Resource;
