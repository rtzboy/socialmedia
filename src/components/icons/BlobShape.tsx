import { SVGProps } from 'react';

const BlobShape = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
		<path fill='#eff6ff' transform='translate(100 100)'>
			<animate
				attributeName='d'
				dur='10000ms'
				repeatCount='indefinite'
				values='M39.9,-69.1C54,-61.1,69.2,-54.9,76.4,-43.7C83.6,-32.5,82.8,-16.2,82.3,-0.2C81.9,15.7,81.9,31.5,76.4,45.7C70.9,59.8,60,72.4,46.4,75.1C32.7,77.7,16.4,70.4,1.7,67.4C-12.9,64.4,-25.8,65.7,-40.1,63.4C-54.4,61.2,-70.1,55.4,-74.4,44.2C-78.7,33,-71.5,16.5,-69.3,1.3C-67.1,-13.9,-69.7,-27.9,-66.3,-40.6C-62.9,-53.3,-53.5,-64.7,-41.4,-73.9C-29.3,-83,-14.7,-89.9,-0.9,-88.4C12.9,-86.9,25.9,-77.1,39.9,-69.1Z;
            
            M40.3,-74C50.7,-63.7,56.7,-49.9,63.5,-37C70.4,-24.1,78,-12.1,77.3,-0.4C76.6,11.2,67.5,22.4,60.7,35.5C54,48.6,49.6,63.5,39.9,72C30.2,80.6,15.1,82.8,-0.7,83.9C-16.4,85.1,-32.9,85.2,-42,76.4C-51.2,67.5,-53,49.6,-58,35.4C-62.9,21.1,-71,10.6,-75.9,-2.8C-80.8,-16.3,-82.6,-32.5,-77.4,-46.2C-72.1,-59.9,-59.8,-71,-45.7,-79.2C-31.6,-87.5,-15.8,-92.9,-0.4,-92.1C14.9,-91.4,29.8,-84.4,40.3,-74Z;
            
            M36,-63.5C47.6,-55.7,58.4,-47.9,67.5,-37.3C76.5,-26.7,83.7,-13.3,85.9,1.3C88.2,15.9,85.4,31.8,76.1,41.8C66.7,51.8,50.7,55.9,36.9,60.5C23.1,65.1,11.5,70.2,-1.4,72.6C-14.3,74.9,-28.5,74.5,-41.7,69.6C-54.9,64.6,-67,55.2,-75.9,42.8C-84.7,30.5,-90.3,15.2,-86.6,2.2C-82.8,-10.9,-69.6,-21.7,-61.3,-35.1C-53,-48.5,-49.7,-64.4,-40.3,-73.4C-30.9,-82.5,-15.5,-84.7,-1.6,-81.9C12.2,-79.1,24.5,-71.4,36,-63.5Z;
            
            M37.6,-65.5C50.1,-57.9,62.5,-50.6,69.4,-39.7C76.3,-28.9,77.6,-14.4,77.1,-0.3C76.5,13.8,74.2,27.7,67.8,39.3C61.3,50.8,50.7,60.2,38.7,66.1C26.8,72,13.4,74.5,0.8,73.2C-11.9,71.9,-23.7,66.8,-35.4,60.7C-47,54.6,-58.5,47.5,-63.1,37.2C-67.8,26.9,-65.8,13.4,-68.1,-1.4C-70.5,-16.2,-77.2,-32.3,-74.5,-46C-71.7,-59.6,-59.5,-70.7,-45.5,-77.4C-31.5,-84.1,-15.7,-86.4,-1.6,-83.7C12.6,-81,25.1,-73.1,37.6,-65.5Z;
            
            M39.9,-69.1C54,-61.1,69.2,-54.9,76.4,-43.7C83.6,-32.5,82.8,-16.2,82.3,-0.2C81.9,15.7,81.9,31.5,76.4,45.7C70.9,59.8,60,72.4,46.4,75.1C32.7,77.7,16.4,70.4,1.7,67.4C-12.9,64.4,-25.8,65.7,-40.1,63.4C-54.4,61.2,-70.1,55.4,-74.4,44.2C-78.7,33,-71.5,16.5,-69.3,1.3C-67.1,-13.9,-69.7,-27.9,-66.3,-40.6C-62.9,-53.3,-53.5,-64.7,-41.4,-73.9C-29.3,-83,-14.7,-89.9,-0.9,-88.4C12.9,-86.9,25.9,-77.1,39.9,-69.1Z'
			></animate>
		</path>
	</svg>
);

export default BlobShape;