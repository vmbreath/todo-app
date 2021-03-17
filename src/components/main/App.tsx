import React, {useEffect} from 'react';
import logo from '../../images/logo.svg';
import './App.scss';
import TODOElement from "../listToDos/ToDoList";
import {Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import EditToDo from "../editToDo/EditToDo";
import {setToDos} from "../../reducers/toDoReducer";
import {allDataQuery} from "../../queries/queries";
import ToDoControls from "../controls/ToDoControls";

// Компонент для создания приложения TODO
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        allDataQuery().then((res) => {
            dispatch(setToDos(res));
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    TODO App
                </p>
            </header>
            <div>
                <ToDoControls/>
                <Switch>
                    <Route path={"/settings/:id"}>
                        <TODOElement/>
                        <EditToDo/>
                    </Route>
                    <Route exact path={"/"}>
                        <TODOElement/>
                    </Route>
                </Switch>
            </div>
        </div>

    );
}

export default App;
