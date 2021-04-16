import { useEffect } from "react";
import { withRouter } from "react-router-dom";

type ScrollToTopProps = {
  history: any;
};

function ScrollToTop({ history }: ScrollToTopProps) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
