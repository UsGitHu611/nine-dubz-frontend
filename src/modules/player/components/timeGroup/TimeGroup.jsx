import { Time } from '@vidstack/react';

export function TimeGroup() {
    return (
        <div className="flex items-center md-mobile:text-xs font-medium text-gray-200/90">
            <Time className="time" type="current" />
            <div className="mx-1">/</div>
            <Time className="time" type="duration" />
        </div>
    );
}