import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => (
  <div className="flex justify-center items-center h-96">
    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-5xl text-gray-500" />
  </div>
);

export default Loader;
