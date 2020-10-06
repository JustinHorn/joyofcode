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

export const projectProps = `
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
        techTags
`;

export const projectQuery = `
    ${projectProps}
    tags {
    id
    name
    }
    postedBy {
    id
    name
    }
`;
