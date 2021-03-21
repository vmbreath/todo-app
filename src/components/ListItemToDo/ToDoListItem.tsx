import React, {FC} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import {ProgressBar} from "../progressBar/ProgressBar";
import {useHistory} from "react-router-dom";
import {green} from '@material-ui/core/colors';
import {changeToDoQuery, deleteToDoQuery} from "../../queries/queries";
import {changeToDo, deleteToDo, setErrorMessage} from "../../reducers/toDoReducer";
import ToDoElementModel from "../../models/ToDoElementModel";
import {useDispatch} from "react-redux";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// Компонент для отрисовки элемента списка TODO
export const ToDoListItem: FC<{ elem: ToDoElementModel }> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const deleteElement = async (id: string) => {
        try {
            const result = await deleteToDoQuery(id);
            dispatch(deleteToDo(result.id));
        } catch (error) {
            dispatch(setErrorMessage("TODO element wasn't deleted!"));
        }
    }
    const changeElement = async (elem: ToDoElementModel, event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const changedToDo = {...elem, isDone: event.target.checked}
            const result = await changeToDoQuery(changedToDo);
            dispatch(changeToDo(result))
        } catch (error) {
            dispatch(setErrorMessage("TODO element wasn't changed!"));
        }
    }

    return (
        <ListItem>
            <FormControlLabel
                control={<GreenCheckbox checked={props.elem.isDone}
                                        onChange={(event) => changeElement(props.elem, event)}
                                        name="checkedG"/>}
                label=""
            />
            <ProgressBar value={props.elem.percent}/>
            <ListItemText
                primary={props.elem.todo}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit"
                            onClick={e => history.push(`/settings/${props.elem.id}`)}>
                    <CreateTwoToneIcon/>
                </IconButton>
                <IconButton edge="end">
                    <DeleteIcon onClick={() => deleteElement(props.elem.id)}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

