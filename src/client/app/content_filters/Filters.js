/**
 * Created by raghu on 10/02/17.
 */

import React from 'react';
import FilterLink from './FilterLink';
import styles from './styles.css';

const Filters = () => (
  <p>
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {" | "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>

  </p>
);

export default Filters;
