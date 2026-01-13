import { configureStore } from "@reduxjs/toolkit";
import productListReducer from './ProductListSlice';
import productDetailsReducer from './ProductDetailsSlice';
import cartScreenReducer from './CartScreenSlice'
import authReducer from './AuthSlice'
import OrderCreationReducer from './OrderCrestionSlice'
import orderDetailsReducer from'./OrderDetailsSlice'
import payOrderReducer from './PayOrderSlice'
import orderHistoryReducer from './OrderhistorySlice'
import userProfileReducer from './UserProfileSlice'
import productsListsReducer from './ProductListsSlice'
import ordersListsReducer from './OrdersListsSlice'
import usersListsReducer from './UsersListsSlice'
export const store = configureStore({
    reducer :{
        productList : productListReducer,
        productDetails : productDetailsReducer,
        cartScreen : cartScreenReducer,
        auth : authReducer,
        orders : OrderCreationReducer,
        orderDetails : orderDetailsReducer,
        orderPay: payOrderReducer,
        orderHistory : orderHistoryReducer,
        profileDetails : userProfileReducer,
        usersLists : usersListsReducer,
        productsLists : productsListsReducer,
        ordersLists : ordersListsReducer,
    }
})