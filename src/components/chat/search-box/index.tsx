import React, { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectSearchAffiliateQuery,
	setAffIdParam,
	setSearchAffiliateQuery,
} from 'store/reducers/conversationSlice';
import { useDebounce } from 'ahooks';
import { selectDeviceMode } from 'store/reducers/screenSlice';
import { RootState } from 'store';

export default memo(function SearchBox() {
	const dispatch = useDispatch();
	const deviceMode = useSelector(selectDeviceMode);
	const [searchParams, setSearchParams] = useState(
		useSelector(selectSearchAffiliateQuery),
	);
	const affIdParam = useSelector(
		(state: RootState) => state.conversation.affIdParam,
	);

	const debouncedSearchParams = useDebounce(searchParams, {
		wait: 500,
	});

	const handleChangeValue = (searchValue: string) => {
		setSearchParams(searchValue);
	};

	useEffect(() => {
		return () => {
			setSearchParams('');
		};
	}, [affIdParam]);

	useEffect(() => {
		dispatch(setSearchAffiliateQuery(debouncedSearchParams));
		if (debouncedSearchParams) setAffIdParam(-1);
	}, [debouncedSearchParams]);

	return (
		<div className={[styles[deviceMode], styles.container].join(' ')}>
			<div className={styles.searchBox}>
				<SearchIcon fontSize="medium" className={styles.searchIcon} />
				<input
					placeholder="Search affiliates by name/email"
					type="text"
					value={searchParams}
					onChange={(e) => handleChangeValue(e.target.value)}
				/>
			</div>
		</div>
	);
});
