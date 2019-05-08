const base = "http://todo-app-evandro-nova.herokuapp.com/";


export const getItem = base + "item/";
export const postItem = base + "item/";
export const putItem = base + "item/";
export const itemById = (id) => base + `item/${id}`;

