import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value, options }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, options);
    }
  }, [barcodeRef, value, options]);

  return <canvas ref={barcodeRef}></canvas>;
};

export default Barcode;
