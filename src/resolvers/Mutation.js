import { authorizeWithGithub } from './authentication/authentication';

import projectMutations from './project';

export default {
  authorizeWithGithub,
  ...projectMutations,
};
