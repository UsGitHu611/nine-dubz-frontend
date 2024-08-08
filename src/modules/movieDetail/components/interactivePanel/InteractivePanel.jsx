import {Flex, Button} from "antd";
import {Author} from "@modules/movieDetail/components/author/Author.jsx";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";

export const InteractivePanel = ({ user }) => {
    return (
        <Flex justify='space-between'>
            <Author name={user.name} picture={user.picture}/>
            <Flex align='center' gap={3}>
                <Button size='large' shape='circle' icon={<LikeOutlined />}/>
                <Button size='large' shape='circle' icon={<DislikeOutlined />}/>
            </Flex>
        </Flex>
    )
}