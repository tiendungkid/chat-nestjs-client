import React, {memo, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectSearchAffiliateQuery,
	setLoadingAffiliateList,
	setSearchAffiliateQuery
} from 'store/reducers/conversationSlice'
import {useDebounce} from 'ahooks'

export default memo(function SearchBox() {
	const dispatch = useDispatch()
	const [searchValue, setSearchValue] = useState(useSelector(selectSearchAffiliateQuery))
	const debouncedSearchValue = useDebounce(searchValue, {
		wait: 700
	})

	useEffect(() => {
		dispatch(setSearchAffiliateQuery(debouncedSearchValue))
		dispatch(setLoadingAffiliateList(true))
	}, [debouncedSearchValue])


	return (
		<div className={styles.container}>
			<SearchIcon fontSize="medium" className={styles.searchIcon}/>
			<input placeholder="Search affiliates" type="text" value={searchValue}
				onChange={e => setSearchValue(e.target.value)}/>
		</div>
	)
})
