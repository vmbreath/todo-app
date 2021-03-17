import React from 'react';
import {makeStyles, Theme, createStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, {CheckboxProps} from '@material-ui/core/Checkbox';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import ProgressBar from "../progressBar/ProgressBar";
import {selectTodos, deleteToDo, changeToDo, selectFilterState} from "../../reducers/toDoReducer";
import {useDispatch, useSelector} from "react-redux";
import IToDoElement from "../../models/IToDoElement";
import {useHistory} from "react-router-dom";
import {changeToDoQuery, deleteToDoQuery} from "../../queries/queries";
import {green} from '@material-ui/core/colors';
import './toDoList.scss'
import enumFilterState from "../../models/enumFilterState";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minWidth: '50vw',
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);
// Компонент для отрисовки и фильтрации списка TODO
export default function ToDoList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const data: IToDoElement[] = useSelector(selectTodos);
    const filterState: enumFilterState = useSelector(selectFilterState);
    const classes = useStyles();
    const deleteElement = (id: string, index: number) => {
        deleteToDoQuery(id).then((res) => {
            dispatch(deleteToDo(id));
        });
    }
    const changeElement = (elem: IToDoElement, event: React.ChangeEvent<HTMLInputElement>,) => {
        let toDo: IToDoElement = {description: "", id: "", isDone: false, percent: 0, todo: ""};
        Object.assign(toDo, elem);
        toDo.isDone = event.target.checked;
        changeToDoQuery(toDo).then((res) => {
            if (res.id === toDo.id) {
                dispatch(changeToDo(toDo))
            }
        });
    }
    const filterTasks = (elem: IToDoElement) => {
        if (elem.isDone && filterState !== enumFilterState.notCompleted) {
            return true
        }
        if (!elem.isDone && filterState !== enumFilterState.completed) {
            return true
        }
        return false;
    }
    return (
        <div className={classes.root}>
            <div className={classes.demo}>
                <List>
                    {data.filter(filterTasks).map((elem, index) => {
                            return (
                                <ListItem key={elem.id}>
                                    <FormControlLabel
                                        control={<GreenCheckbox checked={elem.isDone}
                                                                onChange={(event) => changeElement(elem, event)}
                                                                name="checkedG"/>}
                                        label=""
                                    />
                                    <ProgressBar value={elem.percent}/>
                                    <ListItemText
                                        primary={elem.todo}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit"
                                                    onClick={e => history.push(`/settings/${elem.id}`)}>
                                            <CreateTwoToneIcon/>
                                        </IconButton>
                                        <IconButton edge="end">
                                            <DeleteIcon onClick={() => deleteElement(elem.id, index)}/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        }
                    )}
                </List>
            </div>
        </div>
    );
}

