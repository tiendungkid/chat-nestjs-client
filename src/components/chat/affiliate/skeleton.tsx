import React from 'react'
import styles from './styles.module.scss'
import {Skeleton} from '@mui/material'

interface Props {
    id: number
}

export default function AffiliateSkeleton(props: Props) {
	const {id} = props
	return (
		<li className={styles.container} key={id}>
			<Skeleton animation="wave" variant="circular" width={40} height={36} className={styles.avatar}/>
			<div className={styles.content}>
				<div className={styles.affiliateName}>
					<Skeleton
						animation="wave"
						height={10}
						width="30%"
						style={{marginBottom: 6}}
					/>
				</div>
				<div className={styles.latestChat}>
					<Skeleton animation="wave" height={10} width={id % 2 === 0 ? '70%' : '100%'}/>
				</div>
			</div>
		</li>
	)
}
