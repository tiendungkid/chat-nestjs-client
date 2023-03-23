import React from 'react'
import styles from './styles.module.scss'

const Typing = () => {
	return (
		<div className={styles.typing}>
			<div className={styles.typingDot}></div>
			<div className={styles.typingDot}></div>
			<div className={styles.typingDot}></div>
		</div>
	)
}

export default Typing
