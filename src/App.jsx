import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Cart, Select } from './components';
import * as dataActions from './store/data/_dataActions';
import { numberFormat } from './utils';

import { PRODUCTS, CURRENCIES } from './graphQL';

import './App.scss';

const App = (props) => {
  const { _data: { cart, currency } } = props;

  const products = useQuery(PRODUCTS, { variables: { currency } });
  const currencies = (useQuery(CURRENCIES).data?.currency || []).map(cur => {
    return { label: cur, value: cur };
  });


  const [showCart, setShowCart] = React.useState(false);

  const cartTotal = cart.length > 0 ? (cart.length > 1 ? cart.reduce(function (accumulator, item) {
    return accumulator + item.quantity;
  }, 0) : cart[0].quantity) : 0;

  return (
    <React.Fragment>
      <Layout>
        <Layout.Header className="lumin-header">
          <div className="d-flex justify-content-between">
            <div>
              {/* <a href="./"> */}
              <img src="logo.png" alt="Lumin logo" className="logo" />
              {/* </a> */}
              <Menu mode="horizontal">
                <Menu.Item key="1" className="lumin-menu-item">Shop</Menu.Item>
                <Menu.Item key="2" className="lumin-menu-item">About</Menu.Item>
                <Menu.Item key="3" className="lumin-menu-item">Support</Menu.Item>
                <Menu.Item key="4" className="lumin-menu-item">Blog</Menu.Item>
              </Menu>
            </div>
            <div>
              <Menu mode="horizontal" className="no-padding">
                <Menu.Item key="1" className="lumin-menu-item">Account</Menu.Item>
                <Menu.Item key="2" className="lumin-menu-item" onClick={() => setShowCart(true)}>
                  <img src="cart.png" alt="Lumin cart" className="cart-logo" /> <sup>{cartTotal}</sup>
                </Menu.Item>
                <Menu.Item key="3" className="lumin-menu-item">
                  <Select options={[{ value: 'AR' }, { value: 'EN' }, { value: 'FR' }, { value: 'ES' }, { value: 'DE' }, { value: 'HE' }]} value="EN" name="lang" size="small" />
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </Layout.Header>
        <Layout.Content className="site-layout">
          <div className="css-1qsgf6d">
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="m-0 p-0">All Products</h1>
                <div className="mt-3">A 360° look at Lumin</div>
              </div>
              <div className="mt-3 select">
                <Select options={[{ value: '', label: 'Filter by', disabled: true, }, { value: 'All Products', }, { value: 'New Products', }, { value: 'Sets', }]} name="filter" size="large" value="" />
              </div>
            </div>
          </div>
          <div id="Products">
            <div className="inner">
              {products.loading && (
                <div className="pt-5 pb-5">
                  <div className="row">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="col-lg-4 col-6">
                        <div className="skeleton" style={{ height: 100, width: '100%', borderRadius: 12 }} />
                        <div className="skeleton mt-3" style={{ height: 30, width: '100%', borderRadius: 12 }} />
                        <div className="skeleton mt-3" style={{ height: 30, width: '100%', borderRadius: 12 }} />
                        <div className="skeleton mt-3" style={{ height: 50, width: '100%', borderRadius: 12 }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="row">
                {!products.loading && products.data.products.map(row => (
                  <div key={row.id} className="col-lg-4 col-6">
                    <div className="product py-5 px-4 text-center">
                      <div>
                        <img src={row.image_url} alt={row.title} />
                        <div className="title mt-4 mb-2">{row.title}</div>
                      </div>
                      <div className="price mt-2 mb-2">{currency} {numberFormat(row.price, 2)}</div>
                      <Button type="primary" size="large" onClick={() => {
                        if (row.product_options.length === 0) {
                          props.updateCart(row);
                          setShowCart(true);
                        } else {
                          props.cartPending(row);
                          setShowCart(true);
                        }
                      }}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout.Content>
      </Layout>

      <Cart
        {...props}
        currencies={currencies}
        visible={showCart}
        onCancel={() => {
          setShowCart(false);
          props.cartPending({});
        }}
      />
    </React.Fragment>
  );
}



const mapStateToProps = (state) => ({
  _data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  updatePrices: (currency) => {
    dispatch(dataActions.updatePrices(currency));
  },
  updateCart: (data, operation) => {
    dispatch(dataActions.updateCart(data, operation));
  },
  removeCart: (id) => {
    dispatch(dataActions.removeCart(id));
  },
  cartPending: (data) => {
    dispatch(dataActions.cartPending(data));
  },
  cartCurrency: (currency) => {
    dispatch(dataActions.cartCurrency(currency));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);;
