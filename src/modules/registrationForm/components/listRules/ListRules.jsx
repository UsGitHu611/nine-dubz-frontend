import { Flex } from "antd"

export const ListRules = ({ listRiles, field }) => {
    return (
        <Flex vertical gap='5px'>
            <p>{ field } может содержать: </p>
            {listRiles.map(rule => (
                <p key={rule}>✔ {rule}</p>
            ))}
        </Flex>
    );
}

