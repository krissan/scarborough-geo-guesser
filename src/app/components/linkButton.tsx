import { ReactNode } from 'react';

interface LinkButtonProps {
  children: ReactNode;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, link }) => {
  return (
    <a href={link} className='h-auto font-semibold flex flex-row items-center flex-start text-xs sm:text-sm w-auto'  target="_blank">
      <span className="mr-2 w-8/12 text-xs sm:text-sm">{children}</span>
      <div className="w-2 h-2 sm:w-4 sm:h-4 bg-black transform -rotate-45"></div>
    </a>
  );
};

export default LinkButton;