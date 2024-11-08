import {useState} from "react";
import {OtherInfoMovie} from "@components/otherInfoMovie/OtherInfoMovie.jsx";
import {Button} from "@components/button/Button.jsx";


export const Description = ({description, createdAt, views}) => {
    const [showDescr, setShowDescr] = useState(false);

    return (
        <div className='bg-white/20 rounded-md flex flex-col gap-1'>
            <div className='cursor-pointer p-3' onClick={() => setShowDescr(true)}>
                <OtherInfoMovie views={views} createdAt={createdAt}/>

                <div className={`text-gray-200 ${showDescr ? 'break-all cursor-text whitespace-break-spaces' : 'truncate ...'}`}>
                    {description}
                    {showDescr && (
                        <Button
                            styles='block mt-1 rounded-xl bg-black/60 py-1 px-3 transition-colors hover:bg-gray-300/20'
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDescr(false);
                            }}>Свернуть</Button>
                    )}
                </div>
            </div>
        </div>
    )
}