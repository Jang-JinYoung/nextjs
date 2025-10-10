// src/app/test/layout.tsx

const testLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        layout
        {children}
      </div>
    );
};

export default testLayout;
