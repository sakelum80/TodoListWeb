import React, { useState } from "react";
import { json } from "react-router-dom";
import Constants from "../utilities/Constants";

function UpdateTodoListForm(props) {
    const initialData = Object.freeze(
        {
            description: props.todoItem.description,
            isCompleted: props.todoItem.isCompleted
        });

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTodoItem = {
            id: props.todoItem.id,
            description: props.todoItem.description,
            isCompleted: props.todoItem.isCompleted
        };

        const url = `https://localhost:44347/api/TodoList/UpdateItem`;

        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedTodoItem)
        }).then(r => r.json()).then(res => {
            if (res) {

            }
        });

        props.onTodoItemUpdated(updatedTodoItem);

    }

    return (

        <form className="w-100 px-5">
            <h1 className="mt-5">Updating task "{props.todoItem.description}".</h1>
            <div className="mt-5">
                <label className="h3 form-label">Task Description: </label>
                <input value={formData.description} name="description" className="form-control" onChange={handleChange} />

                <button onClick={handleSubmit} className="btn btn-dark btn-lg w-25 mt-3 ">Submit</button>
                <button onClick={() => props.onTodoItemUpdated(null)} className="btn btn-secondary btn-lg w-25 mt-3">Cancel</button>
            </div>
        </form>

    );
}
export default UpdateTodoListForm;