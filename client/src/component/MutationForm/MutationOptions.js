export function MutationOptions(options) {
  this.options = options;

  this.testMatch = (props) => {
    const requiredKeys = Object.keys(this.options).filter(
      (key) => this.options[key].trim
    );
    for (let i = 0; i < requiredKeys.length; i++) {
      if (!props[requiredKeys[i]].value.trim()) {
        return false;
      }
    }
    return true;
  };

  this.formatVars = (props) => {
    const variables = {};

    Object.keys(this.options).forEach((key) => {
      const value = props[key].value;
      variables[key] = this.options[key].trim ? value.trim() : value;
    });
    return variables;
  };

  this.parseToResource = (resource) => {
    const props = { ...this.options };
    Object.keys(this.options).forEach(
      (key) => (props[key].value = resource[key])
    );
    props.tags.value = props.tags.value.map((x) => x.name);
    return props;
  };
}
