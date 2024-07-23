import {Button, Flex} from "antd";
import {DislikeOutlined, LikeOutlined, ShareAltOutlined} from "@ant-design/icons";

export const InteractivePanel = () => {
    return (
        <Flex justify='end' gap={10}>
            <Button shape='circle' size='large' icon={<LikeOutlined />}/>
            <Button shape='circle' size='large' icon={<DislikeOutlined />}/>
            <Button shape='circle' size='large' icon={<ShareAltOutlined />}/>
        </Flex>
    )
}