import { Component, type ReactNode } from "react";
import "../scss/game-list.scss";

interface GameCardProps {
    name: string;
    rating: number;
    releasedDate: string;
    backgroundImage: string;
    platforms: string[];
    genre: string[];
    description: string;
}

export default class GameCard extends Component<GameCardProps> {
    constructor(props: GameCardProps) {
        super(props);
    }

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
        const {
            name,
            rating,
            releasedDate,
            backgroundImage,
            platforms,
            genre = [],
            description,
        } = this.props;

        return (
            <div className="game-card">
                <img src={backgroundImage} alt={name} />
                <div className="game-card__description">
                    <h1>{name}</h1>
                    <div className="game-card__text">
                        <div className="game-card__meta">
                            <span className="game-card__rating">
                                ★ {rating}
                            </span>

                            <time
                                className="game-card__date"
                                dateTime={releasedDate}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
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
                            <div className="game-card__genres">
                                {genre.map((item, index) => (
                                    <span
                                        key={index}
                                        className="game-card__genre-tag"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}

                        {description && (
                            <p className="game-card__summary">{description}</p>
                        )}

                        {platforms.length > 0 && (
                            <div className="game-card__platform">
                                {platforms.map((item, index) => (
                                    <span
                                        className="game-card__platform-tag"
                                        key={index}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
