var Url = require("url-parse");

const localhost = process.env.LOCALHOST;
class Check {
  constructor(href) {
    if (!validURL(href)) {
      throw Error(href + " is not a valid url");
    }
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

function validURL(str) {
  var pattern = new RegExp(
    "^((http|https)://)(www.)?" +
      "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

module.exports = { Check };
