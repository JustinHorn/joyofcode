var Url = require("url-parse");

const localhost = process.env.LOCALHOST;
class Check {
  constructor(href) {
    const url = new Url(href);
    this.host = url.host;
    this.path = url.pathname;
  }
  noLocalHost = (prop) => {
    if (!this.host || this.host.includes(localhost)) {
      throw Error("No " + localhost + " urls " + prop);
    }
    return { ...this };
  };

  mustBeGithub = () => {
    if (this.host && this.host.includes("github.com")) {
      return { ...this };
    } else {
      throw Error("Github must be a valid github url");
    }
  };
}

module.exports = { Check };
