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
import {selectDeviceMode} from 'store/reducers/screenSlice'

export default memo(function SearchBox() {
	const dispatch = useDispatch()
	const deviceMode = useSelector(selectDeviceMode)
	const [searchValue, setSearchValue] = useState(useSelector(selectSearchAffiliateQuery))
	const debouncedSearchValue = useDebounce(searchValue, {
		wait: 700
	})

	useEffect(() => {
		dispatch(setSearchAffiliateQuery(debouncedSearchValue))
		dispatch(setLoadingAffiliateList(true))
	}, [debouncedSearchValue])


	return (
		<div className={[styles[deviceMode], styles.container].join(' ')}>
			<div className={styles.searchBox}>
				<SearchIcon fontSize="medium" className={styles.searchIcon}/>
				<input placeholder="Search affiliates" type="text" value={searchValue}
					onChange={e => setSearchValue(e.target.value)}/>
			</div>
		</div>
	)
})
