import './App.css';
import Draggable from 'react-draggable';
import { Fragment, useCallback, useState } from 'react';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function App() {



  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState("");
  const [long, setLong] = useState([220, 220])
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

        <IconButton size='large' color="primary" aria-label="upload picture" component="label">
          <input hidden className='inputClass' type='file' accept='image/*' onChange={handleImage} capture="environment" />
          <PhotoCamera />
        </IconButton>

        <br />

        {
          image !== ""
          &&
          <>
            <Button variant="contained" onClick={() => {
              hanldeClickImage()
            }}>Descargar</Button>


            {/*
              aqui inicia el ancho
              */ }
            <p>Modifique el ancho</p>
            <div >
              <div className='modificadores'>


                <IconButton size='large' color="primary" aria-label="upload picture" component="label" onClick={() => {
                  let w = long[0] + 10
                  let h = long[1]
                  setLong([w, h])
                }}>

                  <AddCircleOutlineIcon />
                </IconButton>

                <IconButton size='large' color="primary" aria-label="upload picture" component="label" onClick={() => {
                  let w = long[0] - 10
                  let h = long[1]
                  setLong([w, h])
                }}>

                  <RemoveCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

            {/*
              aqui inicia el largo
              */ }
            <div >
              <p>Modifique el largo</p>
              <div className='modificadores'>
                <IconButton size='large' color="primary" aria-label="upload picture" component="label" onClick={() => {
                  let w = long[0]
                  let h = long[1] + 10
                  setLong([w, h])
                }}>

                  <AddCircleOutlineIcon />
                </IconButton>

                <IconButton size='large' color="primary" aria-label="upload picture" component="label" onClick={() => {
                  let w = long[0]
                  let h = long[1] - 10
                  setLong([w, h])
                }}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

          </>
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

                <img src='/example3.png' alt='' style={{ width: long[0], height: long[1] }} />
              </Draggable>
          }



        </div>
      </div>


    </Fragment>
  );
}

export default App;
