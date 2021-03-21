import React, {FC, useMemo, useState} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {useHistory} from "react-router-dom";
import {addToDo, changeToDo, selectTodos, setErrorMessage} from "../../reducers/toDoReducer";
import {useDispatch, useSelector} from "react-redux";
import './editToDo.scss';
import {useParams} from "react-router-dom";
import {Slider, TextField} from "@material-ui/core";
import {addToDoQuery, changeToDoQuery} from "../../queries/queries";
import ToDoElementModel from "../../models/ToDoElementModel";

// Компонент для создания окна изменения параметров TODO
export const EditToDo: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id}: { "id": string } = useParams();
    const toDosSelector = useSelector(selectTodos);
    const elemToDo: ToDoElementModel = useMemo(() => {
        const result: ToDoElementModel | undefined = toDosSelector.find((value) => value.id === id);
        return (
            result || {
                description: "",
                id: "",
                isDone: false,
                percent: 0,
                todo: ""
            }
        )
    }, [toDosSelector, id]);
    const [toDoState, setToDo] = useState(elemToDo ? elemToDo.todo : '');
    const [description, setDescription] = useState(elemToDo ? elemToDo.description : '');
    const [progress, setProgress] = useState(elemToDo ? elemToDo.percent : 0);
    const handleClose = () => {
        history.goBack();
    };

    const copyEditToDo = (): ToDoElementModel => {
        return {
            ...elemToDo,
            description,
            percent: progress,
            todo: toDoState
        }
    }
    const editTodoElem = async () => {
        const result = await changeToDoQuery(copyEditToDo());
        dispatch(changeToDo(result));
        history.goBack();
    }

    const addToDoElem = async () => {
        const result = await addToDoQuery(copyEditToDo());
        dispatch(addToDo(result));
        history.goBack();
    }

    const saveData = () => {
        try {
            if (id !== "new") {
                editTodoElem();
            } else {
                addToDoElem();
            }
        } catch (error) {
            dispatch(setErrorMessage("TODO element wasn't saved!"));
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
            <DialogTitle style={{backgroundImage: "url(/images/cool-background.png)"}} id="simple-dialog-title">Set TODO
                data</DialogTitle>
            <div style={{backgroundImage: "url(/images/cool-background.png)"}} className={'edit-form'}>
                <TextField
                    id="outlined-multiline-static"
                    label="TODO"
                    multiline
                    rows={2}
                    defaultValue={elemToDo && elemToDo.todo}
                    variant="outlined"
                    onChange={(event) => setToDo(event.target.value)}
                    className={"to-do-multiline"}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="TODO description"
                    multiline
                    rows={4}
                    defaultValue={elemToDo && elemToDo.description}
                    variant="outlined"
                    onChange={(event) => setDescription(event.target.value)}
                    className={"description-multiline"}
                />
                <Slider
                    defaultValue={elemToDo && elemToDo.percent}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={100}
                    onChange={(event, value) => setProgress(Number(value))}
                    className={"slider"}
                />
                <Button variant="contained" color="primary" onClick={saveData} className={"save-button"}>
                    Save
                </Button>
            </div>
        </Dialog>
    );
}
