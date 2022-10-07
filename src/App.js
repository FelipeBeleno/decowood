import './App.css';
import Draggable from 'react-draggable';
import { Fragment, useCallback, useState } from 'react';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';


function App() {



  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState("");
  const trackPos = (data) => {
    console.log(position)
    setPosition({ x: data.x, y: data.y });
  };

  function handleImage(e) {
    let img = e.target.files;
    let img1 = img[0];
    let imgUrl = URL.createObjectURL(img1);
    setImage(imgUrl)
  }

  const hanldeClickImage = useCallback(async () => {
    const canvas = await html2canvas(document.getElementById('image-id'));
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  }, []);

  return (
    <Fragment>

      <br />
      <br />
      <div className='conatiner__menu'>

        <Button variant="contained">
          <input className='inputClass' type='file' accept='image/*' onChange={handleImage} capture="environment" />
        </Button>
        <br />

        {
          image !== ""
          &&
          <Button variant="contained" onClick={() => {
            hanldeClickImage()
          }}>Descargar</Button>
        }
      </div>

      {/*
        se activara cuando se cargue la imagen de la camara 
        limitar la posicion a 0 , 0
    */}
      <div className='content' >

        <div className="App" id="image-id" style={{ backgroundImage: `url("${image}")`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>

          {
            image === ""
              ? <h1 className=''>Sube una imagen horizontal</h1>
              : <Draggable
                //axis="x"
                //handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                onDrag={(e, data) => trackPos(data)}
                onStart={(e, data) => {
                  console.log(e, data)
                }}

                onStop={(e, data) => {
                  console.log(e, data)
                }}
              >

                <img src='/example3.png' alt='' style={{ width: 220, height: 220 }} />
              </Draggable>
          }



        </div>
      </div>


    </Fragment>
  );
}

export default App;
