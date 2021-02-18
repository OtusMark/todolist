import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {FilterValuesType} from "../bll/todolists-reducer";
import {TaskType} from "../bll/tasks-reducer";
import {Task} from "./Task";

// Types
type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

// Component
export const TodoList = React.memo((props: PropsType) => {

    console.log('TodoList is called')

    // Callbacks
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    const filterAll = useCallback(() => {
        props.changeFilter(props.id, "all")
    }, [props.changeFilter, props.id])

    const filterActive = useCallback(() => {
        props.changeFilter(props.id, "active")
    }, [props.changeFilter, props.id])

    const filterCompleted = useCallback(() => {
        props.changeFilter(props.id, "completed")
    }, [props.changeFilter, props.id])

    // Component logic
    let tasksForTodoList = props.tasks;
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    // Render
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            {/*Add new task input*/}
            <AddItemForm addItem={addTask}/>
            {/*Tasks*/}
            <div style={{listStyle: 'none', padding: '0'}}>
                {
                    tasksForTodoList.map(task => <Task key={task.id}
                                                       task={task}
                                                       toDoListId={props.id}
                                                       changeTaskStatus={props.changeTaskStatus}
                                                       changeTaskTitle={props.changeTaskTitle}
                                                       removeTask={props.removeTask}/>)
                }
            </div>
            {/*Filter buttons*/}
            <div>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "all" ? 'contained' : 'outlined'}
                    onClick={filterAll}>All
                </Button>
                <Button
                    style={{marginRight: '5px'}}
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "active" ? 'contained' : 'outlined'}
                    onClick={filterActive}>Active
                </Button>
                <Button
                    size={'small'}
                    color={'primary'}
                    variant={props.filter === "completed" ? 'contained' : 'outlined'}
                    onClick={filterCompleted}>Completed
                </Button>
            </div>
        </div>
    );
})
