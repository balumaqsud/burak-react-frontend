import React from "react";

const Advertisements = () => {
  return (
    <div className="advertisement-frame">
      <video
        className="video"
        autoPlay={true}
        muted
        loop
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/burak-ads.mp4" />
      </video>
    </div>
  );
};

export default Advertisements;
