import { ReactNode } from 'react';
interface TitleProps {
  children: ReactNode;
  className?: string; // Optional className prop
}

const SubTitle: React.FC<TitleProps> = ({ children, className="" }) => {
  return (
    <div
      className={
        "text-sm sm:text-xl lg:text-4xl xl:text-6xl font-bold tracking-tighter font-anton mb-10 mx-auto text-black " + className}
    >
      {children}
    </div>
  );
};

export default SubTitle;
