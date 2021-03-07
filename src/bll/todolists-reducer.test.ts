import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC, ToDoListDomainType,
    todolistsReducer
} from './todolists-reducer';

// removeTodoListAC
test(`correct todolist should be removed`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// addTodolistAC
test(`correct todolist should be added`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

// changeTodolistTitleAC
test(`chosen todolist should change its title`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

// changeTodolistFilterAC
test(`correct filter of todolist should be changed`, () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'completed';

    const startState: Array<ToDoListDomainType> = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});



