import {useEffect, useRef} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";

export const useInfiniteList = (asyncCallback, code) =>  {
    const lastElemObserver = useRef(null);

    const {
        data: resultCommentList,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['getComments'],
        queryFn: ({ pageParam }) => asyncCallback({ code, offset: pageParam }),
        initialPageParam: 0,
        enabled: !!code,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.comments?.length && allPages.length * 10
        }
    })

    useEffect(() => {
        const intObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        })
        if(lastElemObserver.current){
            intObserver.observe(lastElemObserver.current);
        }
        return () => lastElemObserver.current && intObserver?.unobserve(lastElemObserver.current);
    },[hasNextPage])

    return {
        lastElemObserver,
        resultCommentList,
        isFetchingNextPage,
        isPending
    }
}