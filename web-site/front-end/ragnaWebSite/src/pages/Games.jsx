import '../pages/Games.css';
import Pessoa from '../assets/images/pessoa.png';

function Games(){
    return(
       <div>
            <div className="top">
                <button className="back-button" onClick={() => window.location.href = '/'}>◀</button>
                <h1>Jogos</h1>
            </div>
       
            <div className="containerGame">
                <div className="placeGame">
                    <div className="cardGame">
                        <div className="teamsGame">
                            <div className="allyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Ragna FC</h2>
                            </div>
                            <div className="versus">
                                ✖️ 
                            </div>
                            <div className="enemyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Etec FM</h2>
                            </div>
                        </div>
                            <div className="gameInfo">
                                 <p>local: Estádio Ragna</p>
                                <p>data: 15/06/2023</p>
                                <p>horário: 19:00</p>
                            </div>
                        </div>
                    




                    <div className="cardGame">
                        <div className="teamsGame">
                            <div className="allyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Ragna FC</h2>
                            </div>
                            <div className="versus">
                                ✖️ 
                            </div>
                            <div className="enemyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Amigos do Zamba</h2>
                            </div>
                        </div>
                            <div className="gameInfo">
                                 <p>local: São Paulão</p>
                                <p>data: 13/08/2025</p>
                                <p>horário: 20:00</p>
                            </div>
                        
                    </div>




                    <div className="cardGame">
                        <div className="teamsGame">
                            <div className="allyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Ragna FC</h2>
                            </div>
                            <div className="versus">
                                ✖️ 
                            </div>
                            <div className="enemyTeamGame">
                                <img src={Pessoa}/>
                                <h2>Bar do Bola B</h2>
                            </div>
                        </div>
                            <div className="gameInfo">
                                 <p>local: Tico do Manolo</p>
                                <p>data: 09/04/2026</p>
                                <p>horário: 18:30</p>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games;