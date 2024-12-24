import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{ width: '100%' }}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="transparent"
        color="#111111"
      />
    </div>
  );
};

export default Loader;
