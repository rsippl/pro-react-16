import React, { useEffect, useState } from 'react';
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoList from './TodoList';
import VisibilityControl from './VisibilityControl';

const DEFAULT_TODOS = [
    { action: 'Buy Flowers', done: false },
    { action: 'Get Shoes', done: false },
    { action: 'Collect Tickets', done: true },
    { action: 'Call Joe', done: false }
];

// Local storage is isolated per domain, avoid collisions!
const LOCAL_STORAGE_KEY = 'proreact-1-todo-hooks';

const App = () => {
    const userName = 'Adam';
    const [items, setItems] = useState(DEFAULT_TODOS);
    const [showCompleted, setShowCompleted] = useState(true);

    const loadItems = () => {
        const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (data && data.items) {
            setItems(data.items);
            setShowCompleted(data.showCompleted);
        } else {
            setItems(DEFAULT_TODOS);
            setShowCompleted(true);
        }
    };

    useEffect(loadItems, []);

    const onCreate = task => {
        if (!items.find(item => item.action === task)) {
            const updatedItems = [...items, { action: task, done: false }];
            saveItems(updatedItems, showCompleted);
            setItems(updatedItems);
        }
    };

    const onToggle = todo => {
        const updatedItems = items.map(item =>
            item.action === todo.action ? { ...item, done: !item.done } : item
        );
        saveItems(updatedItems, showCompleted);
        setItems(updatedItems);
    };

    return (
        <div>
            <TodoBanner name={userName} items={items} />
            <div className="container-fluid">
                <TodoCreator callback={onCreate} />
                <TodoList items={items} onToggle={onToggle} doneValue={false} />

                <div className="bg-secondary text-white text-center p-2">
                    <VisibilityControl
                        description="Completed Tasks"
                        isChecked={showCompleted}
                        callback={checked => setShowCompleted(checked)}
                    />
                </div>

                {showCompleted && (
                    <TodoList items={items} onToggle={onToggle} doneValue />
                )}
            </div>
        </div>
    );
};

const saveItems = (items, showCompleted) => {
    localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ items, showCompleted })
    );
};

export default App;
