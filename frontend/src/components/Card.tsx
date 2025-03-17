import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  initialText: string;
  hoverText: string;
  initialColor: string;
  hoverColor: string;
  href: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ initialText, hoverText, initialColor, hoverColor, href, imageSrc }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link href={href}>
      <div
        className={`relative w-full h-56 md:h-72 lg:h-80 p-6 md:p-8 rounded-lg text-center transition-colors duration-300 ease-in-out ${
          hover ? hoverColor : initialColor
        } cursor-pointer flex items-center justify-center shadow`} // Added flex utilities for centering
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image 
          src={imageSrc} 
          alt={initialText} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-lg opacity-50"
        />
        <h2 className={`relative z-10 text-4xl md:text-5xl font-semibold transition-colors duration-300 ${hover ? 'text-white' : 'text-black'} drop-shadow`}>
          {hover ? hoverText : initialText}
        </h2>
      </div>
    </Link>
  );
};

export default Card;