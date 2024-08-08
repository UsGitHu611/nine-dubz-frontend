import {Avatar, Flex} from "antd";

export const Author = ({ picture, name }) => {

    return (
        <Flex align='center' gap={10}>
            <Avatar size='large' src={`${import.meta.env.VITE_DEV_URL}/api/file/${picture.name}`}/>
            <h3 className='text-gray-200 text-lg'>{name}</h3>
        </Flex>
    )
}