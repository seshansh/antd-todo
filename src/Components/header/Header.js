import React, { useState } from 'react';
import './Header.css';
import AddTask from '../addTask/AddTask';
import { IoIosAdd } from "react-icons/io";
import AntTable from '../../ant/AntTable';

const Header = () => {
    const [task, setTask] = useState([
        {
            startDate: "2023-04-02",
            dueDate: "2023-04-10",
            tag: "Home",
            title: "Vegetable",
            description: "cmweinciweklcw",
            status: "Open",
            Key: 0
        }
    ]);
    const [formOpen, setFormOpen] = useState(false);


    return <div className='main-head_header'>
        <div className='starting-state'>
            <div className='add-new-task-button'>
                <p className='emoji-part'>😎  <span className='set-task-mot'>Let's set a new goal</span></p>
                <button className='new-task-button' onClick={() => setFormOpen(!formOpen)}><IoIosAdd /> New task</button>
            </div>
        {formOpen ? <div className='add-new-item'><AddTask setTask={setTask} setFormOpen={setFormOpen} /></div> : ""}

            <AntTable data={task} setData={setTask} />
        </div>
        {/* {formOpen ? <div className='add-new-item'><AddTask setTask={setTask} setFormOpen={setFormOpen} /></div> : ""} */}

        {/* {formOpen ? <AddTask setTask={setTask} setFormOpen={setFormOpen} /> : ""} */}
    </div>

};

export default Header;