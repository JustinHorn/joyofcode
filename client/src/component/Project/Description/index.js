import React from "react";
import DOMPurify from "dompurify";

import marked from "marked";

const Description = ({ description }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked(description)),
    }}
  ></div>
);

export default Description;
