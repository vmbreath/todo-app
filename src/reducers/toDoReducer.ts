import {createSlice} from '@reduxjs/toolkit';
import EnumFilterState from '../models/EnumFilterState';
import ToDoElementModel from "../models/ToDoElementModel";

interface initialState {
    listTodos: Array<ToDoElementModel>,
    filterState: EnumFilterState,
    errorMessage: string
}

export const initialState: initialState = ({
    listTodos: [],
    filterState: EnumFilterState.all,
    errorMessage: ''
});

// Содержит данные обо всех ToDo, полученных с mockapi.io и текущее состояние фильтра по ToDo, actions для работы с данными
export const toDoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setToDos: (state, action) => {
            state.listTodos = action.payload;
        },
        deleteToDo: (state, action) => {
            const index = state.listTodos.map(e => e.id).indexOf(action.payload);
            state.listTodos.splice(index, 1);
        },
        changeToDo: (state, action) => {
            const elem = action.payload;
            const index = state.listTodos.map(e => e.id).indexOf(elem.id);
            state.listTodos[index] = elem;
        },
        addToDo: (state, action) => {
            const elem = action.payload;
            state.listTodos.push(elem);
        },
        filterToDos: (state) => {
            switch (state.filterState) {
                case EnumFilterState.all:
                    state.filterState = EnumFilterState.completed;
                    break;
                case EnumFilterState.completed:
                    state.filterState = EnumFilterState.notCompleted;
                    break;
                case EnumFilterState.notCompleted:
                    state.filterState = EnumFilterState.all;
                    break;
            }
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const {setToDos, deleteToDo, changeToDo, addToDo, filterToDos, setErrorMessage} = toDoReducer.actions;
export const selectTodos = (state: { todo: { listTodos: Array<ToDoElementModel> }; }) => state.todo.listTodos;
export const selectFilterState = (state: { todo: { filterState: EnumFilterState }; }) => state.todo.filterState;
export const selectErrorMessage = (state: { todo: { errorMessage: string }; }) => state.todo.errorMessage;
export default toDoReducer.reducer;
export const {reducer, actions} = toDoReducer;