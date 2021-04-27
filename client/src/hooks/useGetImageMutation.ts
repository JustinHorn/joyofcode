import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
const getImage_MUTATION = gql`
  mutation GetImage_MUTATION($href: String!) {
    makePictureOfWebsite(href: $href)
  }
`;

const useGetImageMutation = (
  setImage: (data: string) => void
): ((href: string) => void) => {
  const [getImage, { error: imageError, data: imageData }] = useMutation(
    getImage_MUTATION
  );

  useEffect(() => {
    if (imageData) {
      setTimeout(() => setImage(imageData.makePictureOfWebsite), 1000);
    }
  }, [imageData]);

  const preview = (href:string) => {
    getImage({ variables: { href } });
  };

  return preview;
};

export default useGetImageMutation;
