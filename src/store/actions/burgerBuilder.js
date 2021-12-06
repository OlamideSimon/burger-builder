import * as actionType from './actionTypes';
import axios from '../../axios-orders'

export const addIngredients = (name) => {
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: name
    }
};

export const removeIngredients = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burger-store-343c5-default-rtdb.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())            
            })
    }
}