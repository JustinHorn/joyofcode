import { useLocation, useHistory } from "react-router-dom";

import qs from "qs";

const useHistoryDeleteParam = () => {
  const history = useHistory();
  const location = useLocation();

  const deleteParam = (paramDel) => {
    const search = qs.parse(location, { ignoreQueryPrefix: true });
    const newSearch = {};
    Object.keys(search).forEach(
      (param) => param !== paramDel && (newSearch[param] = search.param)
    );
    history.replace({ ...location, search: qs.stringify(newSearch) });
  };

  return { deleteParam };
};

export default useHistoryDeleteParam;
