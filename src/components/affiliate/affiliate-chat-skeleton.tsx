import React from 'react'
import {Skeleton} from '@mui/material'
import styles from './styles.module.scss'

export default function AffiliateChatSkeleton() {
	return (
		<>
			{[...Array(13).keys()].map(id => (
				<li key={id} className={styles.container}>
					<Skeleton key={id} animation="wave" variant="circular" width={40} height={36} className={styles.avatar}/>

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
							<Skeleton animation="wave" height={10} width="100%"/>
						</div>
					</div>
				</li>
			))}
		</>
	)
}
