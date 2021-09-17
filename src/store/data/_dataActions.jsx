import { SET_CART, SET_currency, SET_CART_PENDING } from '../_types';


export function updatePrices(data) {
    return (dispatch, getState) => {
        let cart = getState().data.cart;
        cart = cart.map(p => {
            let newPrice = data.find(d => d.id === p.id);
            return {
                ...p,
                price: newPrice.price,
            };
        });
        dispatch({
            type: SET_CART, data: cart,
        });
    }
};

export function updateCart(data, operation = '+') {
    return (dispatch, getState) => {
        let cart = getState().data.cart;
        let exist = cart.find(p => `${p.id}-${p.option || ''}` === `${data.id}-${data.option || ''}`) || {};
        if (exist.id) {
            if (exist.quantity === 1 && operation === '-') {
                cart = cart.filter(p => p.id !== exist.id && p.option !== exist.option);
            } else {
                let i = cart.indexOf(exist);
                cart[i]['quantity'] = operation === '+' ? exist.quantity + 1 : exist.quantity - 1;
            }
        } else {
            let item = {
                id: data.id,
                title: data.title,
                price: data.price,
                option: data.option || '',
                image_url: data.image_url,
                quantity: 1,
            };
            cart.unshift(item);
        }
        dispatch({
            type: SET_CART, data: cart,
        });
    }
};

export function removeCart(data) {
    return (dispatch, getState) => {
        let cart = getState().data.cart;
        cart = cart.filter(p => `${p.id}-${p.option || ''}` !== `${data.id}-${data.option || ''}`);
        dispatch({
            type: SET_CART, data: cart,
        });
    }
};


export function cartCurrency(currency) {
    return (dispatch) => {
        dispatch({
            type: SET_currency, data: currency,
        });
    }
};

export function cartPending(data) {
    return (dispatch) => {
        dispatch({
            type: SET_CART_PENDING, data: data,
        });
    }
};