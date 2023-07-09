import React, { memo, useCallback } from 'react';
import styles from './styles.module.scss';
import { Avatar } from '@mui/material';
import { stringAvatar } from 'utils/affiliate-chat-utils/helpers';
import { AffiliateRowResponse } from 'types/response-instances/affiliates-response';

interface Props {
	currentAffiliate?: AffiliateRowResponse;
}

export default memo(function AffiliateHeader(props: Props) {
	const { currentAffiliate } = props;

	if (!currentAffiliate) return <></>;

	const fullName =
		currentAffiliate.first_name + ' ' + currentAffiliate.last_name;
	return (
		<div className={[styles.affiliateInfoContainer].join(' ')}>
			<div className={styles.container}>
				{currentAffiliate.avatar ? (
					<Avatar
						alt={fullName}
						src={currentAffiliate.avatar}
						className={styles.avatar}
					/>
				) : (
					<Avatar
						{...stringAvatar(fullName)}
						className={styles.avatar}
					></Avatar>
				)}
				<div className={styles.affiliateName}>{fullName}</div>
			</div>
		</div>
	);
});
