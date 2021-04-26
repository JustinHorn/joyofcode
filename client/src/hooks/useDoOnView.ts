import { ElementRef } from "react";
import { useEffect, useRef } from "react";

type useDonOnViewProps = () => void;

const useDoOnView = (doSth: useDonOnViewProps) => {
  const viewTrigger = useRef();

  useEffect(() => {
    const func = function (e: any) {
      if (viewTrigger.current) {
        const pageSize = window.innerHeight + window.pageYOffset;
        const heightOfObj = calcHeight(viewTrigger.current!);

        if (heightOfObj <= pageSize) {
          doSth();
        }
      }
    };

    window.addEventListener("scroll", func);
    return () => window.removeEventListener("scroll", func);
  }, [doSth]);

  return viewTrigger;
};

export default useDoOnView;

type calcHeightProps = HTMLElement;

function calcHeight(obj: calcHeightProps) {
  let top = obj.offsetTop + obj.clientHeight;

  let next: any = obj;
  while (next.offsetParent) {
    next = next.offsetParent;
    top += next.offsetTop;
  }
  return top;
}
