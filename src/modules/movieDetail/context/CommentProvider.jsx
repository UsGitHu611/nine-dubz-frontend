import {CommentContext} from "@modules/movieDetail/context/CommentContext.js";

export const CommentProvider = ({ children, commentValue }) => {
    return (
        <CommentContext.Provider value={commentValue}>
            { children }
        </CommentContext.Provider>
    )
}