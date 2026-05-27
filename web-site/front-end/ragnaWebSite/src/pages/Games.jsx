import '../pages/Games.css';
import Pessoa from '../assets/images/pessoa.png';

export default function Games(){
    return(
       <div>
            <div className="top">
                <button className="back-button" onClick={() => window.location.href = '/'}>◀</button>
                <h1>Jogos</h1>
            </div>
       
            <div className="containerGame">
                <div className="placeGame">
                    <div className="cardGame">
                            <div className="cardIconsGame">
                                <img src={Pessoa}/>
                                <h1 className="iconImage">✖️</h1>
                                <img src={Pessoa}/>
                            </div>
                            <div className="nameTeams">
                                <h1>Ragna FC</h1>
                                <h1>Sem Alma FC</h1>
                            </div>
                        <h2></h2>
                        <p></p>
                    </div>
                    <div className="cardGame">
                        <img src={Pessoa}/>
                        <h2></h2>
                        <p></p>
                    </div>
                    <div className="cardGame">
                        <img src={Pessoa}/>
                        <h2></h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
}