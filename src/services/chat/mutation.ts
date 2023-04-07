import {useMutation} from 'react-query'
import {markAsAllRead} from './services'

export const useMarkAsAllReadMutation = () => useMutation((affiliateId: number) => markAsAllRead(affiliateId))
