import React, {useState} from "react";  
import { json } from "react-router-dom";
import Constants from "../utilities/Constants";

function CreateTodoListForm(props)
{
    const initialData = Object.freeze(
        {
            description: ""
        });

    const [formData, setFormData ] = useState(initialData);
 
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const createdTodoItem = {
            description: formData.description,
            isCompleted: false
        };

        const url = 'https://localhost:44347/api/TodoList';

        fetch(url,{
            method: 'POST',
            headers:{'Content-type':'application/json'},
                body: JSON.stringify(createdTodoItem)
            }).then(r=>r.json()).then(res=>{
            if(res){
                
            }
            });

        props.onTodoItemCreated(createdTodoItem);

    }

    return (
    
            <form className="w-100 px-5">
                <h3 className="mt-5">Create new task</h3>
                <div className="mt-5">
                    <label className="h5 form-label">Task Description: </label>
                    <input value={formData.description} name="description" className="form-control" onChange={handleChange}/>

                    <button onClick={handleSubmit} className = "btn btn-dark btn-lg w-25 mt-3  ">Submit</button>
                    <button onClick={() => props.onTodoItemCreated(null) } className="btn btn-secondary btn-lg w-25 mt-3">Cancel</button>
                </div>
            </form>
        
    );
}
export default CreateTodoListForm;