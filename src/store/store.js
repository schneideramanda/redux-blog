import { configureStore, combineReducers } from '@reduxjs/toolkit';
import posts from './posts';
import albums from './albums';
import users from './users';
import modal from './modal';

const reducer = combineReducers({ posts, albums, users, modal });
const store = configureStore({ reducer });

export default store;
