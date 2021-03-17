import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IToDoElement from "../../models/IToDoElement";
import {useHistory} from "react-router-dom";
import {addToDo, changeToDo, selectTodos} from "../../reducers/toDoReducer";
import {useDispatch, useSelector} from "react-redux";
import './editToDo.scss';
import {useParams} from "react-router-dom";
import {Slider, TextField} from "@material-ui/core";
import {addToDoQuery, changeToDoQuery} from "../../queries/queries";

// Компонент для создания окна изменения параметров TODO
export default function EditToDo() {
    let open = true;
    const history = useHistory();
    const dispatch = useDispatch();
    const {id}: { "id": string } = useParams();
    let elemToDo: IToDoElement | undefined = useSelector(selectTodos).find(value => value.id === id);
    if (!elemToDo) {
        elemToDo = {description: "", id: id, isDone: false, percent: 0, todo: ""}
    }
    const [toDoState, setToDo] = useState(elemToDo ? elemToDo.todo : '');
    const [description, setDescription] = useState(elemToDo ? elemToDo.description : '');
    const [progress, setProgress] = useState(elemToDo ? elemToDo.percent : 0);
    const handleClose = () => {
        history.goBack();
    };

    const saveData = () => {
        let toDo: IToDoElement = {description: "", id: "", isDone: false, percent: 0, todo: ""};
        Object.assign(toDo, elemToDo);
        toDo.todo = toDoState;
        toDo.description = description;
        toDo.percent = progress;
        if (toDo.id !== "new") {
            changeToDoQuery(toDo).then((res) => {
                if (res.id === toDo.id) {
                    dispatch(changeToDo(toDo));
                    history.goBack();
                }
            });
        } else {
            addToDoQuery(toDo).then((res) => {
                dispatch(addToDo(res));
                history.goBack();
            });
        }
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle style={{backgroundImage: "url(/cool-background.png)"}} id="simple-dialog-title">Set TODO
                data</DialogTitle>
            <div style={{backgroundImage: "url(/cool-background.png)"}} className={'edit-form'}>
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
