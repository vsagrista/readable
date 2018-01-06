
import {
    SAVE_CATEGORY
} from '../actions';

const initialCategoriesState = {
    names: []
}

export function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case SAVE_CATEGORY:
            return {
                ...state,
                names: action.names
            }
        default:
            return state
    }
}
