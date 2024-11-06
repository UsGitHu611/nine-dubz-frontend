import {useState} from "react";
import {useTableMovies} from "@modules/studioPanel/hook/useTableMovies.js";

export const Select = ({ options, currentStatus, code }) => {
    const [selectVisible,setSelectVisible] = useState(false);
    const tableAction = useTableMovies();

    const assocStatusSelect = {
        true : "Опубликовано",
        false: "Не опубликовано"
    };

    const selectHandler = () => {
        setSelectVisible(prev => !prev);
    }

    const blurHandler = () => {
        setSelectVisible(false);
    }

    const clickHandler = (option) => {
        tableAction.updateStatus({value : option.value, code});
    }

    return (
        <div id='select' tabIndex={0} className='relative cursor-pointer' onBlur={blurHandler} onClick={selectHandler}>
            { assocStatusSelect[currentStatus] }
            <div id='select-menu' className='flex flex-col scale-y-0 w-[clamp(160px,100%,200px)] px-1 py-2 transition-[transform,opacity] origin-top bg-[#1a1919]
                absolute left-5 top-11 rounded-md opacity-0 duration-300 z-[1]'
                 style={{
                     transform: `scaleY(${selectVisible ? 1 : 0})`,
                     opacity: `${selectVisible ? 1 : 0}`
            }}>
                {options.map((option) => (
                    <span key={option.text} className='bg-transparent rounded-md p-2 hover:bg-[#2e2d2d]' onClick={() => clickHandler(option)}>
                        {option.text}
                    </span>
                ))}
            </div>
        </div>

    )
}