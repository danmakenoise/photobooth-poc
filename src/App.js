import React, { useState } from 'react';
import download from 'downloadjs';
import mergeImages from 'merge-images';
import Camera from 'react-html5-camera-photo';
import './App.css';
import 'react-html5-camera-photo/build/css/index.css';

function handleClickDownload(image) {
  return function() {
    download(image, 'image.png', 'image/png');
  }
}

function handleClickRetake(setImage) {
  return function() {
    setImage(undefined);
  }
}

function handleTakePhoto(setImage) {
  return async function(image) {
    const mergedImage = await mergeImages([image, '/frame.png'], {
      height: 842,
      width: 842,
    })
    setImage(mergedImage);
  }
}

export default function App() {
  const [image, setImage] = useState();

  if (!image) {
    return (
      <div className="app">
        <div className="app__camera">
          <Camera
            onTakePhoto={handleTakePhoto(setImage)}
            idealResolution={{width: 842, height: 842}}
          />
        </div>
        <div className="app__frame">
          <img className="frame__image" src="/frame.png" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <img src={image} />
      <button onClick={handleClickDownload(image)}>Download</button>
      <button onClick={handleClickRetake(setImage)}>Retake</button>
    </div>
  );
}
