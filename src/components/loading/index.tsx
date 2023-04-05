import React from 'react'

interface Props {
    pageName?: string
}

export default function Loading(props: Props) {
	const {pageName} = props
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			alignItems: 'center'
		}}>Loading {pageName || ''}...</div>
	)
}

