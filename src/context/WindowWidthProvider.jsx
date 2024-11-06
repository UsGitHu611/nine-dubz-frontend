import {createContext, useContext} from 'react';
import useWindowWidth from '../hook/useWindowWidth.js';

const WindowWidthContext = createContext(null);

export const WindowWidthProvider = ({ children }) => {
    const width = useWindowWidth();

    return (
        <WindowWidthContext.Provider value={width}>
            {children}
        </WindowWidthContext.Provider>
    );
};

export const useWindowWidthContext = () => {
    return useContext(WindowWidthContext);
};
