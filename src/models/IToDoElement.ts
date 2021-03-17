//Интерфейс IToDoElement для объекта TODO
export default interface IToDoElement {
    "id": string,
    "createdAt"?: string,
    "todo": string,
    "percent": number,
    "isDone": boolean,
    "description": string
}

