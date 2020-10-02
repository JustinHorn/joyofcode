import formatValsFromLines from "./formatValsFromLines";

export { formatValsFromLines };

export const comment = `
    id
    text
    date
    postedBy {
        id
        name
    }
`;

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
        commentCount
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
