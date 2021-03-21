import React, {FC, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from '@material-ui/icons/FilterList';
import {Tooltip} from "@material-ui/core";
import {filterToDos, selectFilterState} from "../../reducers/toDoReducer";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import EnumFilterState from "../../models/EnumFilterState";

// Компонент для создания кнопки довалнея новой TODO и фильтра
export const ToDoControls: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [filterButtonText, setFilterButtonText] = useState('Show done');
    const filterState: EnumFilterState = useSelector(selectFilterState);

    useEffect(() => {
        switch (filterState) {
            case EnumFilterState.all:
                setFilterButtonText('Show done');
                break;
            case EnumFilterState.completed:
                setFilterButtonText('Show undone');
                break;
            case EnumFilterState.notCompleted:
                setFilterButtonText('Show all');
                break;
        }
    }, [filterState])

    return (
        <div className={"menu"}>
            <IconButton color="primary" aria-label="add" onClick={() => history.push(`/settings/new`)}>
                <AddIcon fontSize="large"/>
            </IconButton>
            <Tooltip title="Filter by completed/not completed tasks" aria-label="filter">
                <Button id={"filter-button"} variant="contained" color="primary" aria-label="filter"
                        onClick={() => dispatch(filterToDos())}>
                    {filterButtonText}
                    <FilterListIcon fontSize="large"/>
                </Button>
            </Tooltip>
        </div>
    );
}