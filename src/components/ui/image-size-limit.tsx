import React from 'react';

interface ImageSizeLimitProps {
	size?: number;
	unit?: 'MB' | 'KB' | 'GB' | 'TB';
}

export const ImageSizeLimit = ({
	size = 5,
	unit = 'MB',
}: ImageSizeLimitProps) => {
	return (
		<span className='text-xs text-gray-500'>
			Image should not be more than {size}
			{unit}
		</span>
	);
};
