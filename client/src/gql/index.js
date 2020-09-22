import formatValsFromLines from "./formatValsFromLines";

export { formatValsFromLines };

export const resourceProps = `
        id
        title
        href
        date
        imgUrl
        github
        description
        likes {
            id
            user {
                id
            }
        }
        likeCount
`;

export const resourceQuery = `
    ${resourceProps}
    tags {
    id
    name
    }
    postedBy {
    id
    name
    }
`;
