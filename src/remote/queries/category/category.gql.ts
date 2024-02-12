import gql from "graphql-tag";

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategories(
    $countryCode: String
    $currentPage: Int! = 1
    $filters: ProductAttributeFilterInput!
    $pageSize: Int! = 24
    $sort: ProductAttributeSortInput
  ) {
    products(
      countryCode: $countryCode
      currentPage: $currentPage
      filter: $filters
      sort: $sort
      pageSize: $pageSize
    ) {
      ...ProductsFragment
      __typename
    }
  }
  fragment ProductsFragment on Products {
    items {
      brand
      brand_info {
        title
        __typename
      }
      product_label {
        label_id
        name
        label_text
        text_color
        background_color
        active_from
        active_to
        __typename
      }
      id
      is_yalla
      name
      price {
        regularPrice {
          amount {
            currency
            value
            __typename
          }
          __typename
        }
        __typename
      }
      price_range {
        maximum_price {
          regular_price {
            currency
            value
            __typename
          }
          __typename
        }
        minimum_price {
          discount {
            amount_off
            percent_off
            __typename
          }
          final_price {
            currency
            value
            __typename
          }
          regular_price {
            currency
            value
            __typename
          }
          __typename
        }
        __typename
      }
      sku
      small_image {
        url
        __typename
      }
      stock_status
      type_id
      uid
      url_key
      url_suffix
      __typename
    }
    page_info {
      total_pages
      __typename
    }

    __typename
  }
`;
