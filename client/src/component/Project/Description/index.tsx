import React from "react";
import DOMPurify from "dompurify";

import marked from "marked";

type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked(description)),
    }}
  ></div>
);

export default Description;
