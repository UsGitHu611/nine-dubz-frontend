import {Card, Skeleton} from "antd";

const SkeletonList = () => {
    const listItem = Array(8).fill(0);

    return (
        <ul className='grid grid-cols-4 gap-2 my-[50px] lg-mobile:grid-cols-2 md-mobile:grid-cols-1 laptop:grid-cols-3'>
            { listItem.map((_, index) => (
                <li key={index} className='p-3 lg-mobile:w-full lg-mobile:px-3'>
                    <Card
                        styles={{ cover: { borderRadius: "9px", overflow: "hidden" }}}
                        className='bg-transparent border-transparent animate-pulse'
                        cover={
                            <Skeleton.Avatar
                                style={{width: "100%", height:"100%"}}
                                className='h-[210px] md-mobile:h-[275px] sm-mobile:h-[220px] bg-gradient-to-r from-gray-600/10 to-gray-500/10'
                                shape='square'/>
                        }>
                        <Card.Meta
                            avatar={
                            <Skeleton.Avatar
                                className='rounded-full bg-gradient-to-r from-gray-600/10 to-gray-500/10'
                                size='large'/>
                        }
                            description={
                            <Skeleton
                                title={false}
                                paragraph={{rows: 2, width: '250px'}}/>
                            }
                        />
                    </Card>
                </li>
            )) }
        </ul>
    )
}

export default SkeletonList;