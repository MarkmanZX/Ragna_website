import '../pages/Gallery.css';
import Pessoa from '../assets/images/pessoa.png';

function Gallery(){
    return(

        <div>
            <div className="top">
                <button className="back-button" onClick={() => window.location.href = '/'}>◀</button>
                <h1>Galeria</h1>
            </div>

            <div className="containerGallery">
                <div className="galleryItem">

                    <img src={Pessoa}/>
                    <img src={Pessoa}/>
                    <img src={Pessoa}/>
                    <img src={Pessoa}/>
                    <img src={Pessoa}/>
                    <img src={Pessoa}/>

                </div>
            </div>    
        </div>
    );
}

export default Gallery;