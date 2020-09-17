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
