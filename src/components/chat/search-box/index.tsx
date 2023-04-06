import React, {memo, useCallback} from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectSearchAffiliateQuery,
	setSearchAffiliateQuery
} from 'store/reducers/conversationSlice'
import {selectDeviceMode} from 'store/reducers/screenSlice'

export default memo(function SearchBox() {
	const dispatch = useDispatch()
	const deviceMode = useSelector(selectDeviceMode)
	const query = useSelector(selectSearchAffiliateQuery)

	const handleChangeValue = useCallback((searchValue: string) => {
		dispatch(setSearchAffiliateQuery(searchValue))
	}, [query])

	return (
		<div className={[styles[deviceMode], styles.container].join(' ')}>
			<div className={styles.searchBox}>
				<SearchIcon fontSize="medium" className={styles.searchIcon}/>
				<input placeholder="Search affiliates" type="text" value={query}
					onChange={e => handleChangeValue(e.target.value)}/>
			</div>
		</div>
	)
})
