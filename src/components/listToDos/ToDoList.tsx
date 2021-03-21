import React, {FC} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {selectTodos, selectFilterState} from "../../reducers/toDoReducer";
import {useSelector} from "react-redux";
import ToDoElementModel from "../../models/ToDoElementModel";
import './toDoList.scss'
import EnumFilterState from "../../models/EnumFilterState";
import {ToDoListItem} from "../ListItemToDo/ToDoListItem";

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
export const ToDoList: FC = () => {
    const data: ToDoElementModel[] = useSelector(selectTodos);
    const filterState: EnumFilterState = useSelector(selectFilterState);
    const classes = useStyles();

    const filterTasks = (elem: ToDoElementModel) => {
        if (elem.isDone && filterState !== EnumFilterState.notCompleted) {
            return true
        }
        if (!elem.isDone && filterState !== EnumFilterState.completed) {
            return true
        }
        return false;
    }
    return (
        <div className={classes.root}>
            <div className={classes.demo}>
                <List>
                    {data.filter(filterTasks).map((elem) => <ToDoListItem key={elem.id} elem={elem}/>)}
                </List>
            </div>
        </div>
    );
}

