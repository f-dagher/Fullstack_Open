import React from 'react';

const Filter = ( {filter, filterFunction} ) => {
    return (
        <div>
            find countries: <input
                value={filter}
                onChange={filterFunction}
            />
      </div>
    )
  }

export default Filter