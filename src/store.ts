import {configureStore} from '@reduxjs/toolkit';
import toDoReducer from "./reducers/toDoReducer";

export default configureStore({
    reducer: {
        todo: toDoReducer
    },
});

