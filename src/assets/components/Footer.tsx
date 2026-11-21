import { Component, type ReactNode } from "react";
import "../scss/footer.scss";

export default class Footer extends Component {
    render(): ReactNode {
        return (
            <footer className="app-footer">
                <div className="app-footer__container">
                    <div className="app-footer__grid">
                        {/* Kolom 1: Deskripsi Singkat & Kontak */}
                        <div className="app-footer__section app-footer__section--about">
                            <h2 className="app-footer__brand">
                                Games<span>Poi</span>
                            </h2>
                            <p className="app-footer__description">
                                Platform rekomendasi game cerdas yang membantu
                                kamu menemukan judul game terbaik sesuai
                                deskripsi, genre, tahun rilis, dan platform
                                pilihanmu.
                            </p>

                            <div className="app-footer__contact">
                                <p>
                                    <span>Gmail:</span>{" "}
                                    <a href="mailto:emailanda@gmail.com">
                                        emailanda@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <span>Telepon:</span>{" "}
                                    <a href="tel:+6281234567890">
                                        +62 812-3456-7890
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Kolom 2: Tim Pengembang */}
                        <div className="app-footer__section">
                            <h3 className="app-footer__heading">
                                Tim Pengembang
                            </h3>
                            <ol className="app-footer__list app-footer__list--ordered">
                                <li>Andika Tangkawarow</li>
                                <li>Reyfan Korompis</li>
                                <li>Imman Loindong</li>
                            </ol>
                        </div>

                        {/* Kolom 3: Kredit API */}
                        <div className="app-footer__section">
                            <h3 className="app-footer__heading">Kredit API</h3>
                            <ul className="app-footer__list">
                                <li>
                                    <strong>Gemini API</strong> — Pemrosesan
                                    rekomendasi berbasis AI
                                </li>
                                <li>
                                    <strong>RAWG API</strong> — Database
                                    informasi &amp; metadata game
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Baris Hak Cipta */}
                    <div className="app-footer__bottom">
                        <p>
                            &copy; 2026 <strong>GamesPoi</strong>. All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}
