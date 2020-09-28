const tags = (tags) => {
  if (tags.length > 20) {
    throw new Error("No more tags than 20!");
  }

  if (hasAnyTagUpperCaseLetters(tags)) {
    throw new Error("No uppercase letters in tags!");
  }
};

const hasAnyTagUpperCaseLetters = (tags) => {
  return tags.some((tag) =>
    tag
      .split("")
      .some(
        (char) => char.toUpperCase() === char && char.toLowerCase() !== char
      )
  );
};

var Url = require("url-parse");

const localhost = process.env.LOCALHOST;

const noLocalHost = (href, prop) => {
  const url = new Url(href);
  const host = url.host;
  urlValid(href);
  if (!host || host.includes(localhost)) {
    throw Error("No " + localhost + " urls " + prop);
  }
  return { url, host, path: url.pathname };
};

const mustBeGithub = (href) => {
  urlValid(href);
  const url = new Url(href);
  const host = url.host;
  if (host && host.includes("github.com")) {
  } else {
    throw Error("Github must be a valid github url");
  }
};

const urlValid = (href) => {
  if (!validURL(href)) {
    throw Error(href + " is not a valid url");
  }
};

function validURL(str) {
  var pattern = new RegExp(
    "^((http|https)://)(www.)?" +
      "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

module.exports = { tags, noLocalHost, mustBeGithub };
