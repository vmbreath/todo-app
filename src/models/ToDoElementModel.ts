//Интерфейс ToDoElementModel для объекта TODO
export default interface ToDoElementModel {
    id: string,
    createdAt?: string,
    todo: string,
    percent: number,
    isDone: boolean,
    description: string
}

