import {useMutation} from 'react-query'
import {markAsAllRead, uploadFile} from './services'
import { queryClient } from 'services';
import { chunk, flatten, last } from 'lodash';

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
                    const size = 20;

                    const affFlat = flatten([...oldData.pages]);
                    const lastPage: any = last(oldData.pages);

                    const affUpdate = affFlat.map((v: any) => {
                        if (v.id === variables) {
                            
                            return { ...v, latestMessage: {...v.latestMessage, status: '3'} };
                        }

                        return v;
                    });

                    return {
                        ...oldData,
                        pages: !lastPage || lastPage.length === 0 ? [...chunk(affUpdate, size), []] : chunk(affUpdate, size),
                    };
                });
            }
    },
})

export const useUploadFile = () => useMutation((file: File) => uploadFile(file))
