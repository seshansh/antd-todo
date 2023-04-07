import React, { useState } from "react";
import './Home.css';
import Header from "../header/Header";
// import TaskList from "../section/taskLists/TaskList";
// import AntTab from "../section/antTable/AntTable";

const Home = () => {
    const [task, setTask] = useState([]);
    const addNewTask = (newTask) => {
        setTask(preTask => {
            return [newTask, ...preTask];
        });
    }
    console.log(task);
    return <div className="home-main_head">

        <Header addNewTask={addNewTask} />
        {/* {task.map((items, index) => {
            return <TaskList key={index} id={index}
                title={items.title} description={items.description}
                startDate={items.startDate} dueDate={items.dueDate} tag={items.tag} status={items.status} />
        })} */}
    </div>
};

export default Home;