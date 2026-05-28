import '../pages/Cast.css';
import Pessoa from '../assets/images/pessoa.png';

function Cast(){
    return(
        <div>
            <div className="top">
                <button className="back-button" onClick={() => window.location.href = '/'}>◀</button>
                <h1>Elenco</h1>
            </div>

            <div className="containerCast">
                <div className="placeCast">
                    <div className="cardCast">
                        <img src={Pessoa}/>
                        <h2>Davi</h2>
                        <p> 17 anos - Ala - Destro</p>
                    </div>
                    <div className="cardCast">
                        <img src={Pessoa}/>
                        <h2>Gomes</h2>
                        <p> 20 anos - Fixo - Destro</p>
                    </div>
                     <div className="cardCast">
                        <img src={Pessoa}/>
                        <h2>Tim Maia</h2>
                        <p> 19 anos - Goleiro - Canhoto</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cast;