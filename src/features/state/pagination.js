import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const paginationReducers = {
    currentPage: (state, action) => {
        state.currentPage = action.payload;
    },
    pageSize: (state, action) => {
        state.pageSize = action.payload;
    }
}

export function usePagination({ resource, fetchThunk, actions }) {
    const dispatch = useDispatch();

    const { currentPage, totalPages, pageSize, totalRecords, loading, query } = useSelector(
        (state) => state[resource]
    );

    const goToPage = useCallback(
        (page) => {
            dispatch(fetchThunk(page));
        },
        [dispatch, resource, fetchThunk]
    );

    const setPageSize = useCallback(
        (size) => {
            dispatch(actions.pageSize(size));
        },
        [dispatch, resource, fetchThunk]
    );

    const changePageSize = useCallback(
        (size) => {
            dispatch(fetchThunk(size));
        },
        [dispatch, resource, fetchThunk]
    );

    const changeCurrentPage = useCallback(
        (newPage) => {
            dispatch(actions.currentPage(newPage))
        },
        [dispatch, resource]
    )

    return {
        currentPage,
        totalPages,
        pageSize,
        totalRecords,
        loading,
        query,
        goToPage,
        changePageSize,
        setPageSize,
        changeCurrentPage
    };
}
