import {Collapse} from "antd";
import {useState} from "react";
import {OtherInfoMovie} from "@components/otherInfoMovie/OtherInfoMovie.jsx";


export const Description = ({ description, createdAt, views }) => {
    const [showTruncate, setShowTruncate] = useState(true);

    const removeTruncate = () => {
        setShowTruncate(prevState => !prevState);
    }

    const items = [
        {
            key: '1',
            label: <div>
                <OtherInfoMovie views={views} createdAt={createdAt}/>
                {
                    showTruncate ? <p className='truncate ...'>
                        { description }
                    </p> : <></>
                }
            </div>,
            children: <p className='break-all'>{ description }</p>,
        }
    ];

    return (
        <Collapse
            onChange={removeTruncate}
            expandIcon={()=> false}
            collapsible='header'
            bordered={false}
            size='small'
            items={items}/>
    )
}