import { useLocation, useHistory } from "react-router-dom";

import qs from "qs";
import { LocationState } from "aws-sdk/clients/gamelift";

type useHistoryDeleteParamReturn = {
  deleteParam: (paramDel: string) => void;
};

const useHistoryDeleteParam = (): useHistoryDeleteParamReturn => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const deleteParam = (paramDel: string) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const newSearch:any = {};
    Object.keys(search).forEach(
      (param) => param !== paramDel && (newSearch[param] = search.param)
    );
    history.replace({ ...location, search: qs.stringify(newSearch) });
  };

  return { deleteParam };
};

export default useHistoryDeleteParam;
