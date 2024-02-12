import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation addSimpleProductToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
      }
    ) {
      cart {
        id
        ...CartTriggerFragment
        ...MiniCartFragment
        __typename
      }
    }
  }

  fragment CartTriggerFragment on Cart {
    id
    summary_qty
    total_quantity
    __typename
  }

  fragment MiniCartFragment on Cart {
    id
    total_quantity
    prices {
      subtotal_excluding_tax {
        currency
        value
        __typename
      }
      __typename
    }
    ...ProductListFragment
    __typename
  }

  fragment ProductListFragment on Cart {
    id
    items {
      id
      uid
      product {
        id
        name
        sku
        url_key
        thumbnail {
          url
          __typename
        }
        stock_status
        ... on ConfigurableProduct {
          variants {
            attributes {
              uid
              __typename
            }
            product {
              id
              thumbnail {
                url
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      prices {
        price {
          currency
          value
          __typename
        }
        __typename
      }
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          id
          option_label
          value_id
          value_label
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
`;
