import React, {memo, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectSearchAffiliateQuery,
	setSearchAffiliateQuery
} from 'store/reducers/conversationSlice'
import {useDebounce} from 'ahooks'
import {selectDeviceMode} from 'store/reducers/screenSlice'

export default memo(function SearchBox() {
	const dispatch = useDispatch()
	const deviceMode = useSelector(selectDeviceMode)
	const [searchParams, setSearchParams] = useState(useSelector(selectSearchAffiliateQuery))

	const debouncedSearchParams = useDebounce(searchParams, {
		wait: 700
	})

	const handleChangeValue = (searchValue: string) => {
		setSearchParams(searchValue)
	}

	useEffect(() => {
		dispatch(setSearchAffiliateQuery(debouncedSearchParams))
	}, [debouncedSearchParams])

	return (
		<div className={[styles[deviceMode], styles.container].join(' ')}>
			<div className={styles.searchBox}>
				<SearchIcon fontSize="medium" className={styles.searchIcon}/>
				<input placeholder="Search affiliates" type="text" value={searchParams}
					onChange={e => handleChangeValue(e.target.value)}/>
			</div>
		</div>
	)
})
