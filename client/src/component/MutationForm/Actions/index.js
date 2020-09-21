import { useGetImageMutation } from "hooks";

const useGetAction = (setFormValue) => {
  const setImage = (imgUrl) => {
    setFormValue("imgUrl", imgUrl);
  };

  const preview = useGetImageMutation(setImage);

  return preview;
};

export const makeScreenShotAction = {
  useGetAction,
  actionName: "make a Screenshot",
};
