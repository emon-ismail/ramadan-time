import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <svg className="footer-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#0d9488" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="footer-text">Ramadan Schedule {currentYear}</span>
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-powered">
                        Powered by <span className="powered-brand">Dreams On</span>
                    </div>
                </div>
                <div className="footer-copyright">
                    © {currentYear} Dreams On. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
