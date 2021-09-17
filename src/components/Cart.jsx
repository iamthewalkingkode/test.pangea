import React from 'react';
import { Avatar, Button, Drawer } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { Select } from '.';
import { PRODUCTS } from '../graphQL';
import { numberFormat } from '../utils';

const Cart = props => {
    const { visible, currencies, _data: { cart, currency, cart_pending } } = props;

    const [v, setValues] = React.useState({});
    const [updateCartPrices, cartPrices] = useLazyQuery(PRODUCTS);

    React.useEffect(() => {
        // console.log(v);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [v]);

    React.useEffect(() => {
        if (!cartPrices.loading && cartPrices.data && cartPrices.data.products.length > 0) {
            // console.log(cartPrices);
            props.updatePrices(cartPrices.data.products);
            props.cartCurrency(cartPrices.variables.currency);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartPrices]);

    return (
        <React.Fragment>
            <Drawer placement="right" closable={true} visible={visible} width={550} onClose={() => props.onCancel()}>
                {cart_pending.id && (
                    <div>
                        <div className="text-center mb-4">
                            <Avatar src={cart_pending.image_url} alt={cart_pending.title} size={40} shape="square" />
                        </div>
                        <div className="mt-5">
                            <h4 className="freight">First, let's personalize.</h4>
                            <div>Products that you receive may vary according to your age bracket &amp; skin type to optimize results.</div>

                            <div className="mt-5"><b>Personalization Details</b></div>
                            <div className="mt-3 mb-5">
                                {cart_pending.product_options.map(option => {
                                    return (
                                        <div className="mb-3">
                                            <b>{option.title}</b>
                                            <Select
                                                size="medium" value={v[option.prefix]}
                                                options={option.options.map(opt => { return { value: opt.value, label: opt.value } })}
                                                onChange={e => {
                                                    setValues({ ...v, [option.title]: e });
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <Button type="primary" size="large" block onClick={() => {
                                let option = cart_pending.product_options.map(option => {
                                    return { [option.title]: v[option.title] || option.options[0].value }
                                }).map(opt => {
                                    return Object.values(opt)[0]
                                }).join(' | ');
                                props.updateCart({ ...cart_pending, option });
                                props.cartPending({});
                            }}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                )}

                {!cart_pending.id && (
                    <div>
                        <div className="text-center mb-4">
                            <h5>Your Cart</h5>
                        </div>

                        <div className="mb-3" style={{ maxWidth: 80 }}>
                            <Select
                                options={currencies} name="lang" size="small" value={currency}
                                onChange={(currency) => {
                                    updateCartPrices({ variables: { currency } });
                                }}
                            />
                        </div>

                        {cart.length === 0 && (
                            <div className="text-center">There are no items in your cart.</div>
                        )}

                        {cart.map(row => (
                            <div key={row.id} className="item mb-4 p-3">
                                <div className="d-flex justify-content-end">
                                    <div className="pointer" onClick={() => props.removeCart(row)}>x</div>
                                </div>
                                <div className="d-flex justify-content-betweens">
                                    <div className="description mr-4">
                                        <h6>{row.title}</h6>
                                        <div><small>{row.option}</small></div>
                                        <small>One time purchase of Two Month supply.</small>
                                        <div className="d-flex justify-content-between mt-3">
                                            <div>
                                                <div className="quantity-selector d-flex justify-content-between">
                                                    <span className="counter-action decrement" onClick={() => props.updateCart(row, '-')}>-</span>
                                                    <span className="counter-number counter"> {row.quantity} </span>
                                                    <span className="counter-action increment" onClick={() => props.updateCart(row)}>+</span>
                                                </div>
                                            </div>
                                            <div>
                                                {cartPrices.loading && <i className="fa fa-spin fa-spinner text-muted" />}&nbsp;
                                                {currency} {numberFormat(row.quantity * row.price, 2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Avatar src={row.image_url} alt={row.title} size={80} shape="square" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Drawer>
        </React.Fragment>
    );
}

export default Cart;