import {useState} from "react";

export const TextArea = ({ maxLength, placeholder, name, showCounter, autoFocus, rows=1, defaultValue }) => {
    const [countWord, setCountWord] = useState(0);

    const autoResize = (evt) => {
        evt.target.style.height = 'auto';
        evt.target.style.height = evt.target.scrollHeight + 'px';
        setCountWord(evt.target.value.length);
    }

    return (
        <div className='w-full relative'>
            <textarea
                className='bg-transparent outline-none resize-none w-full border-b border-gray-200/10 text-gray-200
                   pr-[70px] pb-3 leading-5 overflow-hidden focus:border-gray-200/50 transition duration-500'
                autoFocus={autoFocus}
                onChange={autoResize}
                maxLength={maxLength}
                defaultValue={defaultValue}
                placeholder={placeholder}
                name={name}
                rows={rows}></textarea>
            { showCounter && (
                <span className='absolute right-0 bottom-0 -translate-y-1/2 text-gray-200/50'>
                    {countWord}/{maxLength}
                </span>
            ) }
        </div>
    )
}