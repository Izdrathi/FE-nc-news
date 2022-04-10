import { useState } from "react";

export const Sorting = ({ setSort, setOrder }) => {
    const [currentValue, setCurrentValue] = useState();

    const handleClick = (sort) => {
        const [sortBy, orderBy] = sort.split(" ");
        setSort(sortBy);
        setOrder(orderBy);
        setCurrentValue(sort);
    };

    return (
        <div className="control has-background-white">
            <label className="mx-3">Choose articles by:</label>
            <div className="select">
                <select
                    value={currentValue}
                    onChange={(event) => {
                        handleClick(event.target.value);
                    }}
                >
                    <option value="created_at ASC">Oldest</option>
                    <option value="created_at DESC">Most recent</option>
                    <option value="title ASC">A-Z</option>
                    <option value="title DESC">Z-A</option>
                    <option value="votes DESC">Most kudos</option>
                    <option value="votes ASC">Least kudos</option>
                    <option value="comment_count DESC">Most comments</option>
                    <option value="comment_count ASC">Least comments</option>
                </select>
            </div>
        </div>
    );
};
