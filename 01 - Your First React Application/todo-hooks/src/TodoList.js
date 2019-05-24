import React from 'react';
import TodoRow from './TodoRow';

const TodoList = ({ items, onToggle, doneValue }) => {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Done</th>
                </tr>
            </thead>
            <tbody>
                {items
                    .filter(item => item.done === doneValue)
                    .map(item => (
                        <TodoRow
                            key={item.action}
                            item={item}
                            callback={onToggle}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export default TodoList;
