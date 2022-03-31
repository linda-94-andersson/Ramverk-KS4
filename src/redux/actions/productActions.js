import fakeStoreApi from "../../apis/fakeStoreApi";
import axios from "axios";
import { url } from "../../apis/fakeStoreApi";
import { ActionTypes } from "../constans/action-types"

export const fetchProducts = () => async (dispatch) => {
    const response = await fakeStoreApi.get("/products");
    dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data });
    console.log(response, " res all fetchProducts");
};

export const fetchProduct = (id) => async (dispatch) => {
    const response = await fakeStoreApi.get(`/products/${id}`);
    dispatch({ type: ActionTypes.SELECTED_PRODUCT, payload: response.data });
    console.log(response, " res single fetchProduct");
};

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    };
};

export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT
    };
};

export const getAllCate = () => async (dispatch) => {
    const res = await axios.get(`${url}/products/categories`);
    dispatch({
        type: ActionTypes.GET_CATEGORY,
        payload: res.data,
    });
    console.log(res, " res allCate");
}