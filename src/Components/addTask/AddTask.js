import React, { useState } from "react";
import './AddTask.css';
import { IoMdAddCircleOutline } from "react-icons/io";


const AddTask = ({ setFormOpen, setTask }) => {

    const [error, setError] = useState("");
    const [showTitleError, setShowTitleError] = useState(false);
    const [showDescriptionError, setShowDescriptionError] = useState(false);
    const [showDueDateError, setShowDueDateError] = useState(false);

    const start = (new Date().toISOString().split("T")[0]);

    const todayDate = new Date().toISOString().split("T")[0];

    const [addTask, setAddTask] = useState({
        startDate: todayDate,
        dueDate: "",
        tag: "",
        title: "",
        description: "",
        status: "Open",
        key: Math.random()
    });

    const addButtonHandler = () => {
        if (addTask.title.trim().length === 0 && addTask.description.trim().length === 0 && addTask.dueDate.length === 0) {
            setShowDescriptionError(true);
            setShowTitleError(true);
            setShowDueDateError(true);
            setError("*Please fill all required fields");
            return;
        }
        if (addTask.dueDate.length === 0) {
            setShowDueDateError(true);
            setError("*Please fill all required fields");
            return;
        }
        if (addTask.title.trim().length === 0) {
            setShowTitleError(true);
            setError("*Please fill all required fields");
            return;
        }
        if (addTask.description.trim().length === 0) {
            setShowDescriptionError(true);
            setError("*Please fill all required fields");
            return;
        }

        setTask((pre) => {
            return [addTask, ...pre];
        });
        setAddTask({
            startDate: todayDate,
            dueDate: "",
            tag: "",
            title: "",
            description: "",
            status: "Open",
        });

        setFormOpen(false);
    }

    const cancelButtonHandler = () => {
        setFormOpen(false);
    }

    return <React.Fragment>
        <div className="main-head_addTask">

            <table className="add-task_task" >
                <tbody>
                    <tr className="input-field-rows">
                        <td>
                            <label>Due date<span style={{ color: "red" }}>*</span></label>
                        </td>
                        <td>
                            <input type="date"
                                value={addTask.dueDate}
                                onChange={e => {
                                    setAddTask({ ...addTask, dueDate: e.target.value })
                                    setShowDueDateError(false)
                                }}
                                min={start ? new Date(start).toISOString().split("T")[0] : ""}
                                className="due-date_input" />
                            {showDueDateError ? <p style={{ color: "red" }}>{error}</p> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Tags</label>
                        </td>
                        <td>
                            <select className="add-tag-select" value={addTask.tag} onChange={e => setAddTask({ ...addTask, tag: e.target.value })}>
                                <option value="">Choose</option>
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="School">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Friends">Friends</option>
                                <option value="Family">Family</option>
                            </select>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Title<span style={{ color: "red" }}>*</span></label>
                        </td>
                        <td>
                            <input type="text"
                                value={addTask.title} onChange={e => {
                                    setAddTask({ ...addTask, title: e.target.value })
                                    setShowTitleError(false)
                                }}
                                className="add-title-input" placeholder="Title..." maxLength="100" />
                            {showTitleError ? <p style={{ color: "red" }}>{error}</p> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Description<span style={{ color: "red" }}>*</span></label>
                        </td>
                        <td>
                            <textarea className="add-description-area" placeholder="write description...."
                                value={addTask.description} onChange={e => {
                                    setAddTask({ ...addTask, description: e.target.value })
                                    setShowDescriptionError(false)
                                }}
                                rows="1" maxLength="1000" />
                            {showDescriptionError ? <p style={{ color: "red" }}>{error}</p> : null}
                        </td>
                    </tr>
                    <tr>
                        <td><div className="form-button-section"><button onClick={addButtonHandler}
                            className="add-task-button">Add Task<IoMdAddCircleOutline size="1.2rem" /></button></div></td>

                        <td><div className="form-button-section"><button onClick={cancelButtonHandler}
                            className="cancel-task-button">Cancel</button></div></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </React.Fragment>
};

export default AddTask;