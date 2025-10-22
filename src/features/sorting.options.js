export const postSortingOptions = [
    { key: "newest", label: "Newest", query: "sort=date&order=desc" },
    { key: "oldest", label: "Oldest", query: "sort=date&order=asc" },
    { key: "most-liked", label: "Most liked", query: "sort=likes&order=desc" },
    {
        key: "most-disliked",
        label: "Most disliked",
        query: "sort=dislikes&order=desc",
    },
];


export const commentSortingOptions = [
    { key: "newest", label: "Newest", query: "sort=date&order=desc" },
    { key: "oldest", label: "Oldest", query: "sort=date&order=asc" },
    { key: "most-liked", label: "Most liked", query: "sort=likes&order=desc" },
    { key: "least-liked", label: "Least liked", query: "sort=likes&order=asc" },
    {
        key: "most-disliked",
        label: "Most disliked",
        query: "sort=dislikes&order=desc",
    },
];