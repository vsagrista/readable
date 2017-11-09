import { connect } from 'react-redux';
var _ = require('lodash');

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const countPostsByCategory = (idsArr, posts, category) => {
    let counter = 0;
    idsArr.map((id) => {
        if (posts[id].category === category)
            counter++;
    })
    return counter;
}

// returns the array of keys from an object (normalization pattern)
export const sortIdsBy = (items, option) => {
    let sortedIds = [];
    let itemsArray = [];
    Object.keys(items).map((key => itemsArray.push(items[key])));
    _.sortBy(itemsArray, option).map(item => sortedIds.push(item.id));
    return sortedIds.reverse();
}