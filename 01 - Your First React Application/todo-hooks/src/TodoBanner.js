import React from 'react';

const TodoBanner = props => (
    <h4 className="bg-primary text-white text-center p-2">
        {props.name}'s To Do List ({props.items.filter(t => !t.done).length}{' '}
        items to do)
    </h4>
);

export default TodoBanner;
