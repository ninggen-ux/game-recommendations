import { Component, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Game } from "./GameList";
import "../scss/game-modal.scss";

interface GameDetailModalProps {
    game: Game;
    onClose: () => void;
}

export default class GameDetailModal extends Component<GameDetailModalProps> {
    private previousOverflow = "";

    componentDidMount(): void {
        this.previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount(): void {
        document.body.style.overflow = this.previousOverflow;
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
            this.props.onClose();
        }
    };

    private handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    };

    private formatReleaseDate(dateString: string): string {
        if (!dateString) return "TBA";
        const parsedDate = new Date(dateString);
        if (Number.isNaN(parsedDate.getTime())) return dateString;

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(parsedDate);
    }

    render(): ReactNode {
        const { game, onClose } = this.props;
        const {
            name,
            rating,
            releasedDate,
            backgroundImage,
            platforms,
            genre = [],
            description,
        } = game;

        return createPortal(
            <div
                className="game-modal-backdrop"
                role="dialog"
                aria-modal="true"
                aria-labelledby="game-modal-title"
                onClick={this.handleBackdropClick}
            >
                <div className="game-modal">
                    <button
                        type="button"
                        className="game-modal__close"
                        aria-label="Tutup detail game"
                        onClick={onClose}
                    >
                        ×
                    </button>

                    <div className="game-modal__cover">
                        <img src={backgroundImage} alt={name} />
                    </div>

                    <div className="game-modal__body">
                        <h2 id="game-modal-title" className="game-modal__title">
                            {name}
                        </h2>

                        <div className="game-modal__meta">
                            <span className="game-modal__rating">
                                ★ {rating}
                            </span>

                            <time
                                className="game-modal__date"
                                dateTime={releasedDate}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>
                                    {this.formatReleaseDate(releasedDate)}
                                </span>
                            </time>
                        </div>

                        {genre.length > 0 && (
                            <div className="game-modal__genres">
                                {genre.map((item, index) => (
                                    <span
                                        key={`${item}-${index}`}
                                        className="game-modal__genre-tag"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="game-modal__description-box">
                            <h3>Deskripsi</h3>
                            <p className="game-modal__description">
                                {description || "Deskripsi tidak tersedia."}
                            </p>
                        </div>

                        {platforms.length > 0 && (
                            <div className="game-modal__platforms-section">
                                <h3>Platform</h3>
                                <div className="game-modal__platforms">
                                    {platforms.map((item, index) => (
                                        <span
                                            key={`${item}-${index}`}
                                            className="game-modal__platform-tag"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>,
            document.body,
        );
    }
}
