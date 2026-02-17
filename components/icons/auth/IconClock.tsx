import {SVGProps} from "react";

const IconClock = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.6668 7.99998C14.6668 11.68 11.6802 14.6666 8.00016 14.6666C4.32016 14.6666 1.3335 11.68 1.3335 7.99998C1.3335 4.31998 4.32016 1.33331 8.00016 1.33331C11.6802 1.33331 14.6668 4.31998 14.6668 7.99998Z"
                stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.4734 10.12L8.40675 8.88665C8.04675 8.67332 7.75342 8.15999 7.75342 7.73999V5.00665"
                  stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default IconClock;