import { useState, useEffect } from 'react';
import {debounce} from "@/helper/debounce.js";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        const debouncedHandleResize = debounce(handleResize, 300);

        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
};

export default useWindowWidth;
