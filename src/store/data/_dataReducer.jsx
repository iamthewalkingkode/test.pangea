import { getStorage, getStorageJson, setStorage, setStorageJson } from '../../utils';
import { SET_CART, SET_CART_PENDING, SET_currency } from '../_types';

const initialState = {
    cart: getStorageJson('cart'),
    cart_pending: {},
    currency: getStorage('currency') || 'USD',
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_CART:
            setStorageJson('cart', action.data);
            return {
                ...state,
                cart: action.data,
            };

        case SET_CART_PENDING:
            return {
                ...state,
                cart_pending: action.data,
            };

        case SET_currency:
            setStorage('currency', action.data);
            return {
                ...state,
                currency: action.data,
            };
    }
};


export default dataReducer;