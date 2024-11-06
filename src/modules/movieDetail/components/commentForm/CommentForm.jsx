import { SendOutlined } from "@ant-design/icons";
import {useComment} from "@modules/movieDetail/hook/useComment.js";
import {TextArea} from "@components/textarea/TextArea.jsx";
import {PictureOrSavingLetter} from "@components/pictureOrSavingLetter/PictureOrSavingLetter.jsx";
import {Button} from "@components/button/Button.jsx";


export const CommentForm = ({code}) => {
    const actionComment = useComment();

    const finishHandler = (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const comment = formData.get('comment');
        actionComment.addComment({comment, code});
        evt.target.reset();
    }

    return (
        <form className='flex flex-col gap-2 my-2 md-mobile:hidden' onSubmit={finishHandler}>
            <div className='flex gap-3'>
                <PictureOrSavingLetter/>
                <TextArea name='comment' autoFocus={false} placeholder='Оставить комментарий...' />
            </div>
            <Button type='submit' styles='px-4 py-2 ml-auto' icon={<SendOutlined style={{fontSize: "13px"}}/>}>
                Отправить
            </Button>
        </form>
    )
}