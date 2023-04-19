import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressBarComponent = ({ data = {} }) => {
  const { progress = 0, variant = 'primary' } = data;

  return (
      <ProgressBar now={progress} variant={variant} label={`${progress.toFixed(0)}%`} />
  );
};

export default React.memo(ProgressBarComponent);
