import {useMutation} from 'react-query'
import {markAsAllRead, uploadFile} from './services'
import { queryClient } from 'services';
import { chunk, flatten } from 'lodash';

export const useMarkAsAllReadMutation = () => useMutation((affiliateId: number) => markAsAllRead(affiliateId), {
    onSettled(_, __, variables) {        
        const queryCache = queryClient.getQueryCache();
            const queryKeys =
                queryCache
                    .getAll()
                    .map((cache) => cache.queryKey)
                    .filter((v: any) => v.find((k: any) => k === 'affiliates')) ?? [];

            for (const queryKey of queryKeys) {
                const cacheAffiliate = queryClient.getQueryData(queryKey);
                if (!cacheAffiliate) continue;

                queryClient.setQueryData(queryKey as any, (oldData: any) => {
                    const size = oldData.pages?.[0]?.length || 20;

                    const affFlat = flatten([...oldData.pages]);

                    const affUpdate = affFlat.map((v: any) => {
                        if (v.id === variables) {
                            
                            return { ...v, latestMessage: {...v.latestMessage, status: '3'} };
                        }

                        return v;
                    });

                    return {
                        ...oldData,
                        pages: chunk(affUpdate, size),
                    };
                });
            }
    },
})

export const useUploadFile = () => useMutation((file: File) => uploadFile(file))
