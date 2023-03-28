import React, {memo, useCallback} from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import {useDispatch, useSelector} from 'react-redux'
import {selectSearchAffiliateQuery, setSearchAffiliateQuery} from 'store/reducers/conversationSlice'

export default memo(function SearchBox() {
	const dispatch = useDispatch()
	const searchValue = useSelector(selectSearchAffiliateQuery)

	const updateSearchAffiliateQuery = useCallback((value: string) => {
		dispatch(setSearchAffiliateQuery(value))
	}, [searchValue])

	return (
		<div className={styles.container}>
			<SearchIcon fontSize="medium" className={styles.searchIcon}/>
			<input placeholder="Search affiliates" type="text" value={searchValue}
				onChange={e => updateSearchAffiliateQuery(e.target.value)}/>
		</div>
	)
})
