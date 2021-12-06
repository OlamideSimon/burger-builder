import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

// functions
const purchaseInit = (state) => {
    return updateObject(state, {purchased: false})
};

const purchaseBurgerStart = (state) => {
    return updateObject(state, {loading: true})
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    const updatedElements = {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    }
    return updateObject(state, updatedElements)
};

const purchaseBurgerFail = (state) => {
    return updateObject(state, {loading: false})
};

const fetchOrdersStart = (state) => {
    return updateObject(state, {loading: true})
};

const fetchOrdersSuccess = (state, action) => {
    const fetchElements = {
        orders: action.orders,
        loading: false
    }
    return updateObject(state, fetchElements)
};

const fetchOrdersFail = (state) => {
    return updateObject(state, {loading: false})
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state);
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionType.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionType.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        default:
            return state
    }
};

export default reducer;