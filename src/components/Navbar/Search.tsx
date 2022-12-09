import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import styles from './search.module.scss'
const Search = () => {
  return (
    <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon}/>
    </div>
  )
}

export default Search