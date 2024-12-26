import { ReactNode } from 'react';
interface TitleProps {
  children: ReactNode;
  className?: string; // Optional className prop
}

const Title: React.FC<TitleProps> = ({ children, className="" }) => {
  return (
    <div
      className={
        "text-md sm:text-xl lg:text-6xl xl:text-8xl font-extrabold tracking-tighter font-anton mb-10 mx-auto text-black " + className}
    >
      {children}
    </div>
  );
};

export default Title;
