import React, {useState} from 'react'
import styles from './styles.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface Props {
	onChange: (value: string) => void;
}

export default function SearchBox(props: Props) {
	const {onChange} = props
	const [value, setValue] = useState('')
	return (
		<div className={styles.container}>
			<FontAwesomeIcon icon={['fal', 'magnifying-glass']} className={styles.searchIcon}/>
			<input placeholder="Search affiliates" type="text" value={value} onChange={e => {
				setValue(e.target.value)
				onChange(e.target.value)
			}}/>
		</div>
	)
}
