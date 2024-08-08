import {Collapse} from "antd";
import {useState} from "react";
import {timeCreated} from "@/helper/timeCreated.js";


export const Description = ({ description, createdAt }) => {
    const [showTruncate, setShowTruncate] = useState(true);

    const removeTruncate = () => {
        setShowTruncate(prevState => !prevState);
    }

    const items = [
        {
            key: '1',
            label: <div>
                <p>{ timeCreated(createdAt) }</p>
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