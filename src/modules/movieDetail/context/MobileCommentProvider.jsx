import {MobileCommentContext} from "@modules/movieDetail/context/MobileCommentContext.js";

export const MobileCommentProvider = ({ children, value }) => {
    return (
        <MobileCommentContext.Provider value={value}>
            { children }
        </MobileCommentContext.Provider>
    )
}