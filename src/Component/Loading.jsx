import React, { useEffect } from 'react';

function LoadingOverlay({ loading }) {

    console.log(loading);
  useEffect(() => {
    // if (loading) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Loading...</h1>
      <p className="text-gray-500">Please wait while we fetch the data.</p>
    </div>
  );
}

export default LoadingOverlay;
