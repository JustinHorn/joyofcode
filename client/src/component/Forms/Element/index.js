import React from "react";

import FormHandler from "component/Forms/Handler";

const Element = (props) => {
  const { k: key, formValues } = props;

  return (
    <tr>
      <td>
        <h4>
          {formValues[key].name}
          {formValues[key].trim ? "*" : ""}:
        </h4>
      </td>
      <td>
        <FormHandler {...props} />
      </td>
    </tr>
  );
};

export default Element;
