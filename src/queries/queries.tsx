import ToDoElementModel from "../models/ToDoElementModel";

const mockApiUrl = 'https://6044a896c0194f00170bc13e.mockapi.io/todos/';

//Получение всего списка TODO c mockapi.io
export const allDataQuery = async (): Promise<ToDoElementModel[]> => {
    const response = await fetch(mockApiUrl);
    const commits = await response.json();
    return await commits;
}

//Удаление конкретной TODO c mockapi.io
export const deleteToDoQuery = async (toDoId: string): Promise<ToDoElementModel> => {
    const url = mockApiUrl + toDoId;
    const response = await fetch(url,
        {
            method: "DELETE",
        });
    const commits = await response.json();
    return await commits;
}

//Добавление TODO на mockapi.io
export const addToDoQuery = async (data: ToDoElementModel): Promise<ToDoElementModel> => {
    const url = mockApiUrl;
    const response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
    const commits = await response.json();
    return await commits;
}

//Изменение TODO на mockapi.io
export const changeToDoQuery = async (data: ToDoElementModel): Promise<ToDoElementModel> => {
    const url = mockApiUrl + data.id;
    const response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(data)
        });
    const commits = await response.json();
    return await commits;
}