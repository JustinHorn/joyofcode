export const resourceProps = `
        id
        title
        imgUrl
        github
        href
        date
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
