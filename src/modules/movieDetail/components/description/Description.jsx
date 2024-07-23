import {Collapse} from "antd";
import {useState} from "react";


export const Description = ({ description, createdAt }) => {
    const [showTruncate, setShowTruncate] = useState(true);
    const dateNow = new Date();

    const timeCreated = () => {
        const SECONDS = 1000;
        const MINUTES = 60 * SECONDS;
        const HOURS = 60 * MINUTES;
        const DAYS = 24 * HOURS;
        const MONTH = DAYS*30;
        const YEAR = MONTH*12;


        const dateCreated = new Date(createdAt);
        const dateTimeStamp = dateNow.getTime() - dateCreated.getTime();

        const minutes = dateTimeStamp / MINUTES;
        const hour = dateTimeStamp / HOURS;
        const day= dateTimeStamp / DAYS;
        const month= dateTimeStamp / MONTH;
        const year = dateTimeStamp / YEAR;


        if(minutes < 1){
            return new Intl.RelativeTimeFormat().format(-1, 'minutes');
        }else if(hour < 1){
            return new Intl.RelativeTimeFormat().format(Math.ceil(-minutes), 'minutes');
        }else if(day < 1){
            return new Intl.RelativeTimeFormat().format(Math.ceil(-hour), 'hours');
        }else if(month < 1){
            return new Intl.RelativeTimeFormat().format(Math.ceil(-day), 'days');
        }else if(year < 1) {
            return new Intl.RelativeTimeFormat().format(Math.ceil(-month), 'months');
        }else {
            return new Intl.RelativeTimeFormat().format(Math.ceil(-year), 'years');
        }
    }
    const removeTruncate = () => {
        setShowTruncate(prevState => !prevState);
    }


    const items = [
        {
            key: '1',
            label: <div>
                <p>{ timeCreated() }</p>
                {
                    showTruncate ? <p className='truncate ...'>
                        { description }
                    </p> : ""
                }
            </div>,
            children: <p>{ description }</p>,
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