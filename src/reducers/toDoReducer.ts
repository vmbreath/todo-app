import {createSlice} from '@reduxjs/toolkit';
import enumFilterState from '../models/enumFilterState';
import IToDoElement from "../models/IToDoElement";

interface initialState {
    listTodos: Array<IToDoElement>,
    filterState: enumFilterState
}

export const initialState: initialState = ({
    listTodos: [
        {
            "id": "1",
            "createdAt": "2021-03-07T12:29:07.934Z",
            "todo": "Sharable even-keeled middleware",
            "percent": 68,
            "isDone": false,
            "description": "Use the online RAM capacitor, then you can program the bluetooth application!"
        },
        {
            "id": "2",
            "createdAt": "2021-03-06T17:30:52.193Z",
            "todo": "Cross-group needs-based moratorium",
            "percent": 80,
            "isDone": false,
            "description": "Try to compress the SMTP hard drive, maybe it will hack the open-source microchip!"
        }
    ],
    filterState: enumFilterState.all
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
                case enumFilterState.all:
                    state.filterState = enumFilterState.completed;
                    break;
                case enumFilterState.completed:
                    state.filterState = enumFilterState.notCompleted;
                    break;
                case enumFilterState.notCompleted:
                    state.filterState = enumFilterState.all;
                    break;
            }
        },
    },
});

export const {setToDos, deleteToDo, changeToDo, addToDo, filterToDos} = toDoReducer.actions;
export const selectTodos = (state: { todo: { listTodos: Array<IToDoElement> }; }) => state.todo.listTodos;
export const selectFilterState = (state: { todo: { filterState: enumFilterState }; }) => state.todo.filterState;
export default toDoReducer.reducer;
export const {reducer, actions} = toDoReducer;