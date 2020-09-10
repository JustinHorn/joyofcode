import React from "react";

import styles from "./resource.module.css";

import moment from "moment";

import Url from "url-parse";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

import { FeedQuery } from "component/Feed";

const MUTATION_DELETE = gql`
  mutation MUTATION_DELETE($id: Int!) {
    deleteResource(id: $id) {
      id
      title
      href
    }
  }
`;

const Resource = ({ id, title, tags, href, author, date }) => {
  const [mutate, { error, data }] = useMutation(MUTATION_DELETE, {
    update(cache, m_result, m_id) {
      const { deleteResource } = m_result.data;

      const data = cache.readQuery({ query: FeedQuery });

      const feed = data.feed;

      const index = feed.findIndex((x) => x.id === deleteResource.id);
      const new_data = {
        feed: [...feed.slice(0, index), ...feed.slice(index + 1)],
      };
      cache.writeQuery({ query: FeedQuery, data: new_data });
    },
  });

  const deleteResource = () => {
    mutate({ variables: { id } });
  };

  if (error) {
    alert(error);
  }

  return (
    <div className={styles.resource}>
      <div className={styles.resourceBookmark}>B</div>
      <div className={styles.resourceBody}>
        <h4>
          <a href={href}> {title} </a> ({new Url(href).hostname})
        </h4>
        <div className={styles.postInfo}>
          {"by " +
            author +
            " on " +
            moment(Number(date)).format("YYYY.MM.DD-HH:mm")}
        </div>
        <ul className={styles.tags}>
          {tags?.map(({ name }, index) => (
            <li key={index}>{name}</li>
          ))}
          <button onClick={deleteResource}>Delete</button>
        </ul>
      </div>
    </div>
  );
};

export default Resource;
