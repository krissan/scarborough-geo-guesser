import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="text-md sm:text-xl lg:text-6xl xl:text-8xl font-extrabold tracking-tighter font-anton">
      {children}
    </div>
  );
};

export default Title;
