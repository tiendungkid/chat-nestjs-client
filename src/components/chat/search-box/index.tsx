import React, {memo, useState} from 'react'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
    onChange: (value: string) => void;
}

export default memo(function SearchBox(props: Props) {
	const {onChange} = props
	console.log('Search box rendered')
	const [value, setValue] = useState('')
	return (
		<div className={styles.container}>
			<SearchIcon fontSize="medium" className={styles.searchIcon}/>
			<input placeholder="Search affiliates" type="text" value={value} onChange={e => {
				setValue(e.target.value)
				onChange(e.target.value)
			}}/>
		</div>
	)
})
