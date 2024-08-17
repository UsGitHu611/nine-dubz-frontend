import {Menu, Tooltip, useVideoQualityOptions} from '@vidstack/react';
import { SettingsIcon } from '@vidstack/react/icons';
import { buttonClass, tooltipClass } from '../button/Button.jsx';


export function Settings({ placement, tooltipPlacement }) {
    const options = useVideoQualityOptions({ auto: false, sort: 'descending' });

    return (
        <Menu.Root className="parent">
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Menu.Button className={buttonClass}>
                        <SettingsIcon className="h-8 w-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90" />
                    </Menu.Button>
                </Tooltip.Trigger>
                <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
                    Settings
                </Tooltip.Content>
            </Tooltip.Root>
            <Menu.Content className='animate-out fade-out data-[open]:animate-in data-[open]:fade-in-10 flex h-[var(--menu-height)]
            max-h-[400px] md-mobile:max-h-[440px] md-mobile:minw-w-[140px] md-mobile:text-[17px] min-w-[130px] flex-col rounded-md border border-none
             bg-black/85 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height]
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
