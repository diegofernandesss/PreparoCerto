export const Button = ({ onClick, children }) => {
    return (
      <button
        onClick={onClick}
        
        className={`ml-4 bg-primary hover:bg-primary_hover 
                 text-white hover:text-white px-4 py-2 
                  rounded-full`}
      >
        {children}
      </button>
    );
  };
  