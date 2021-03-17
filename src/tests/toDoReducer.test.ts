import {actions, reducer} from "../reducers/toDoReducer";
import enumFilterState from "../models/enumFilterState";

const initialState = {
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
};
describe("toDoReducer test", () => {
    it("it should replace all toDos", () => {
        const todos = [
            {
                "id": "5",
                "createdAt": "5555",
                "todo": "middleware",
                "percent": 38,
                "isDone": true,
                "description": "Use application!"
            }
        ]
        expect(reducer({...initialState}, actions.setToDos(todos))).toEqual({"filterState": 0, "listTodos": todos});
    });
    it("it should delete toDo", () => {
        const todos = [
            {
                "id": "1",
                "createdAt": "2021-03-07T12:29:07.934Z",
                "todo": "Sharable even-keeled middleware",
                "percent": 68,
                "isDone": false,
                "description": "Use the online RAM capacitor, then you can program the bluetooth application!"
            }
        ]
        expect(reducer({...initialState}, actions.deleteToDo(2))).toEqual({"filterState": 0, "listTodos": todos});
    });
    it("it should change toDo", () => {
        const toDoToChange = {
            "id": "1",
            "createdAt": "2030",
            "todo": "SMth",
            "percent": 100,
            "isDone": true,
            "description": "Use!"
        }
        expect(reducer({...initialState}, actions.changeToDo(toDoToChange)).listTodos[0]).toEqual(toDoToChange);
    });
    it("it should add toDo", () => {
        const toDoToAdd = {
            "id": "3",
            "createdAt": "2040",
            "todo": "SMth",
            "percent": 0,
            "isDone": false,
            "description": "Use!"
        }
        expect(reducer({...initialState}, actions.addToDo(toDoToAdd)).listTodos[2]).toEqual(toDoToAdd);
    });
    it("it should switch filter", () => {
        expect(reducer({...initialState}, actions.filterToDos()).filterState).toEqual(enumFilterState.completed);
        initialState.filterState = enumFilterState.completed;
        expect(reducer({...initialState}, actions.filterToDos()).filterState).toEqual(enumFilterState.notCompleted);
        initialState.filterState = enumFilterState.notCompleted;
        expect(reducer({...initialState}, actions.filterToDos()).filterState).toEqual(enumFilterState.all);
    });
});