import IToDoElement from "../models/IToDoElement";

const mockApiUrl = 'https://6044a896c0194f00170bc13e.mockapi.io/todos/';
//Получение всего списка TODO c mockapi.io
export async function allDataQuery() {
    let response = await fetch(mockApiUrl);
    let commits = await response.json();
    return await commits;
}
//Удаление конкретной TODO c mockapi.io
export async function deleteToDoQuery(toDoId: string) {
    const url = mockApiUrl + toDoId;
    let response = await fetch(url,
        {
            method: "DELETE",
        });
    let commits = await response.json();
    return await commits;
}
//Добавление TODO на mockapi.io
export async function addToDoQuery(data: IToDoElement) {
    const url = mockApiUrl;
    let response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
    let commits = await response.json();
    return await commits;
}
//Изменение TODO на mockapi.io
export async function changeToDoQuery(data: IToDoElement) {
    const url = mockApiUrl + data.id;
    let response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(data)
        });
    let commits = await response.json();
    return await commits;
}