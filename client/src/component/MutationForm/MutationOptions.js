export function MutationOptions(options) {
  this.options = options;

  this.testMatch = (props) => {
    const requiredKeys = Object.keys(this.options).filter(
      (key) => this.options[key] === "rq"
    );
    for (let i = 0; i < requiredKeys.length; i++) {
      if (!props[requiredKeys[i]].trim()) {
        return false;
      }
    }
    return true;
  };

  this.formatVars = (props) => {
    const variables = {};

    Object.keys(this.options).forEach((key) => {
      variables[key] =
        this.options[key] === "rq" ? props[key].trim() : props[key];
    });
    return variables;
  };

  this.nullyfy = () => {
    const nullOptions = {};
    Object.keys(this.options).forEach((key) => (nullOptions[key] = ""));
    return nullOptions;
  };

  this.parseProps = (resource) => {
    const props = {};
    Object.keys(this.options).forEach((key) => (props[key] = resource[key]));
    props.tags = props.tags.map((x) => x.name).join(",");
    return props;
  };
}
