import React, {FC, useCallback, useEffect} from 'react';
import './App.scss';
import {ToDoList} from "../listToDos/ToDoList";
import {Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {EditToDo} from "../editToDo/EditToDo";
import {setErrorMessage, setToDos} from "../../reducers/toDoReducer";
import {allDataQuery} from "../../queries/queries";
import {ToDoControls} from "../controls/ToDoControls";
import {SnackbarError} from "../Snackbar/Snackbar";

// Компонент для создания приложения TODO
export const App: FC = () => {
    const dispatch = useDispatch();

    const getAllData = useCallback(async () => {
        try {
            const result = await allDataQuery();
            dispatch(setToDos(result));
        } catch (error) {
            dispatch(setErrorMessage("Data wasn't loaded!"));
        }
    }, [dispatch])

    useEffect(() => {
        getAllData();
    }, [getAllData]);

    return (
        <div className="App">
            <header className="App-header">
                <img src="/images/logo.svg" className="App-logo" alt="logo"/>
                <p>
                    TODO App
                </p>
            </header>
            <div>
                <ToDoControls/>
                <Switch>
                    <Route path={"/settings/:id"}>
                        <ToDoList/>
                        <EditToDo/>
                    </Route>
                    <Route exact path={"/"}>
                        <ToDoList/>
                    </Route>
                </Switch>
                <SnackbarError/>
            </div>
        </div>
    );
}

