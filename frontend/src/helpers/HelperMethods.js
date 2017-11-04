
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const countPostsByCategory = (idsArr, posts, category) => {
    let counter = 0;
    idsArr.map((id) => {
        if(posts[id].category === category)
            counter ++;
    })
    return counter;
}