import { gql } from '@apollo/client';

const CURRENCIES = gql`
    query {
        currency
    }
`;

const PRODUCTS = gql`
    query Product($currency: Currency!) {
        products {
            id
            title
            image_url
            price (currency: $currency)
            product_options {
                title
                prefix
                suffix
                options {
                    id
                    value
                }
            }
        }
    }
`;


export {
    PRODUCTS,
    CURRENCIES,
};