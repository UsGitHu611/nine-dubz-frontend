import {Menu, Tooltip, useVideoQualityOptions} from '@vidstack/react';
import { SettingsIcon } from '@vidstack/react/icons';
import { buttonClass, tooltipClass } from '../button/Button.jsx';


export const menuClass =
    'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in ' +
    'data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[140px] ' +
    'flex-col rounded-md border border-none bg-black/95 ' +
    'p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] ' +
    'duration-300 will-change-[height] data-[resizing]:overflow-hidden cursor-pointer';


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
            <Menu.Content className={menuClass} placement={placement}>
                <Menu.RadioGroup value={options.selectedValue}>
                    {options.map(({ label, value, select, quality }) => (
                        <Menu.Radio className='p-1 pl-2 transition-colors hover:bg-gray-50/20' value={value} onSelect={select} key={label}>
                            { quality.id === '240p' ? 'ШАКАЛ🐺' : label }
                        </Menu.Radio>
                    ))}
                </Menu.RadioGroup>
            </Menu.Content>
        </Menu.Root>
    );
}
