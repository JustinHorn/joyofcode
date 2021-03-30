import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
const useLinedCached = (linedDefaultTF) => {
  const query = useQuery();

  const queryLined = query.get("lined");

  let initLined = linedDefaultTF;

  if (queryLined && (queryLined === "true" || queryLined === "false")) {
    initLined = queryLined === "true";
  }

  const [lined, setLined] = useState(!!initLined);

  const history = useHistory();
  useEffect(() => {
    if (lined) {
      query.set("lined", "true");
    } else {
      query.set("lined", "false");
    }
    history.replace(window.location.pathname + "?" + query.toString());
  }, [lined]);

  return [lined, setLined];
};

export default useLinedCached;
