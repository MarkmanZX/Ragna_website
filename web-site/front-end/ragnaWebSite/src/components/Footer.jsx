import '../styles/Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <div className="footerContainer">

                <div className="footerSection">
                    <h2>Ragna FC</h2>
                    <p>Time competitivo de Futebol</p>
                </div>

                <div className="footerSection">
                    <h2>Contato</h2>
                    <p>Email: ragnafcavare@gmail.com</p>
                    <p>Telefone: (14) 98803-0027</p>
                </div>

                <div className="footerSection">
                    <h2>Região</h2>
                    <p>Avaré - SP</p>
                    <p>Brasil</p>
                </div>

                <div className="footerSection">
                    <h2>Redes Sociais</h2>
                    <p>Instagram</p>
                </div>
            </div>

            <div className="footerBottom">
                <p>© 2022 Ragna FC - Todos os direitos reservados</p>
            </div>
        </footer>
    )
}

export default Footer;