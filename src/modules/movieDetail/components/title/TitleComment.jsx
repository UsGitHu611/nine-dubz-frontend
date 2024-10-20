import {ActionPanel} from "@modules/movieDetail/components/actionButtonsPanel/ActionPanel.jsx";

export const TitleComment = ({title, createdAt, ...actionProps}) => {
    return (
        <div className='flex gap-[6px] items-baseline md-mobile:gap-0'>
            <p className='text-gray-200 md-mobile:text-[#aaa] md-mobile:text-[12px]
            md-mobile:after:content-["|"] md-mobile:after:px-1.5'>
                {title}
            </p>
            <small className='text-gray-200/50 md-mobile:text-[#aaa]'>{createdAt}</small>
            <ActionPanel {...actionProps}/>
        </div>
    )
}