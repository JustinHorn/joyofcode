export const tags = (tags: string[]) => {
  if (tags.length > 20) {
    throw new Error('No more tags than 20!');
  }

  if (hasAnyTagUpperCaseLetters(tags)) {
    throw new Error('No uppercase letters in tags!');
  }
};

export const hasAnyTagUpperCaseLetters = (tags: string[]) => {
  return tags.some((tag) =>
    tag
      .split('')
      .some(
        (char) => char.toUpperCase() === char && char.toLowerCase() !== char
      )
  );
};

var Url = require('url-parse');

const localhost = process.env.LOCALHOST;

export const noLocalHost = (href: string, prop?: string) => {
  const url = new Url(href);
  const host = url.host;
  urlValid(href);
  if (!host || host.includes(localhost)) {
    throw Error('No ' + localhost + ' urls ' + prop);
  }
  return { url, host, path: url.pathname };
};

export const mustBeGithub = (href: string) => {
  urlValid(href);
  const url = new Url(href);
  const host = url.host;
  if (host && host.includes('github.com')) {
  } else {
    throw Error('Github must be a valid github url');
  }
};

export const urlValid = (href: string) => {
  if (!validURL(href)) {
    throw Error(href + ' is not a valid url');
  }
};

export function validURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

export function isEmailValid(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
