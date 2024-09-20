import cn from "classnames";
import React from "react";

interface DocProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Doc = (props: DocProps) => {
  const { children, isOpen, toggle } = props;
  return (
    <div
      className={cn(
        "fixed transform transition-all duration-300 top-0 w-96 right-0 bottom-0 pt-14 bg-slate-800",
        {
          "translate-x-full": !isOpen,
          "translate-x-0": isOpen,
          "shadow-md": isOpen,
        }
      )}
    >
      <button
        onClick={toggle}
        className={cn(
          "text-white transform transition-all duration-300 bg-slate-800 rounded-tl-md rounded-bl-md p-2 absolute top-4 left-0",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {isOpen ? ">>" : "<<"}
      </button>
      {children}
    </div>
  );
};

export default Doc;
