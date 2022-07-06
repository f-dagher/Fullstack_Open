import React from 'react';

const Filter = ( {filter, filterFunction} ) => {
    return (
        <div>
            filter shown with: <input
                value={filter}
                onChange={filterFunction}
            />
      </div>
    )
}

export default Filter