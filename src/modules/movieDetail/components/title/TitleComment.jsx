import {ActionPanel} from "@modules/movieDetail/components/actionButtonsPanel/ActionPanel.jsx";

export const TitleComment = ({title, createdAt, ...actionProps}) => {
    return (
        <div className='flex gap-[6px] items-center'>
            <p className='text-gray-200'>{title}</p>
            <small className='text-gray-200/50'>{createdAt}</small>
            <ActionPanel {...actionProps}/>
        </div>
    )
}