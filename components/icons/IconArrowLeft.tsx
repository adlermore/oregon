import React, {SVGProps} from 'react';

const IconArrowLeft = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width={21}
			height={21}
			viewBox="0 0 21 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M15.8669 10.9229L4.20022 10.9371M4.20022 10.9371L10.0406 16.7633M4.20022 10.9371L10.0264 5.09666"
				stroke="#344054"
				strokeWidth="1.67"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default IconArrowLeft;