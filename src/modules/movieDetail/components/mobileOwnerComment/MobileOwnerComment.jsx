import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {TitleComment} from "@modules/movieDetail/components/title/TitleComment.jsx";
import {movieDetailStore} from "@modules/movieDetail/store/store.js";

export const MobileOwnerComment = ({ parentId }) => {
    const ownerComment = movieDetailStore(state => state.commentList)['a' + parentId];

    return (
        <li className='p-3 flex gap-2 items-center bg-white/10'>
            {/*<PictureOrSavingLetter*/}
            {/*    userPicture={ownerComment?.user?.picture?.name}*/}
            {/*    userName={ownerComment?.user?.name}*/}
            {/*/>*/}
            <div className='flex flex-col w-full'>
                <TitleComment title={ownerComment?.user?.name} createdAt={ownerComment?.createdAt}/>
                <p className='text-gray-200 text-[13px] break-all pr-8'>
                    {ownerComment?.text}
                </p>
            </div>
        </li>
    )
}