import React, {useState} from 'react'
import styles from './styles.module.scss'

interface Props {
	onChange: (value: string) => void;
}

export default function SearchBox(props: Props) {
	const {onChange} = props
	const [value, setValue] = useState('')
	return (
		<div className={styles.container}>
			<input placeholder="Search affiliates" type="search" value={value} onChange={e => {
				setValue(e.target.value)
				onChange(e.target.value)
			}}/>
		</div>
	)
}
