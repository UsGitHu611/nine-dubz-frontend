import {Menu, Tooltip, useVideoQualityOptions} from '@vidstack/react';
import { buttonClass, tooltipClass } from '../button/Button.jsx';
import {SettingOutlined} from "@ant-design/icons";

export function Settings({ placement, tooltipPlacement }) {
    const options = useVideoQualityOptions({ auto: false, sort: 'descending' });

    return (
        <Menu.Root className="parent">
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Menu.Button className={buttonClass}>
                        <SettingOutlined className={`
                            aspect-square text-lg transform flex justify-center
                        `} />
                    </Menu.Button>
                </Tooltip.Trigger>
                <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                    Settings
                </Tooltip.Content>
            </Tooltip.Root>
            <Menu.Content className='animate-out fade-out data-[open]:animate-in data-[open]:fade-in-10 flex h-[var(--menu-height)]
            max-h-[400px] md-mobile:max-h-[440px] md-mobile:min-w-[100px] min-w-[130px] flex-col rounded-md
             bg-black/85 p-2.5 font-sans md-mobile:text-xs font-medium outline-none backdrop-blur-sm transition-[height]
            duration-200 will-change-[height] data-[resizing]:overflow-hidden cursor-pointer' placement={placement}>
                <Menu.RadioGroup value={options.selectedValue}>
                    {options.map(({ value, select, quality }) => (
                        <Menu.Radio className='p-1 pl-2 transition-colors hover:bg-gray-50/20' value={value} onSelect={select} key={quality?.title}>
                            { quality?.title }
                        </Menu.Radio>
                    ))}
                </Menu.RadioGroup>
            </Menu.Content>
        </Menu.Root>
    );
}
