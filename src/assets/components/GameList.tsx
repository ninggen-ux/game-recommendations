import { Component, type ReactNode } from "react";
import GameCard from "./GameCard";
import "../scss/game-list.scss";

export interface Game {
    id: number | string;
    name: string;
    rating: number;
    releasedDate: string;
    backgroundImage: string;
    platforms: string[];
    genre: string[];
    description: string;
}

interface GameListProps {
    games: Game[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
}

export default class GameList extends Component<GameListProps> {
    render(): ReactNode {
        const { games, isLoading, error, hasSearched } = this.props;

        if (isLoading) {
            return (
                <section>
                    <div className="game-list__status">
                        <span
                            className="game-list__spinner"
                            aria-hidden="true"
                        />
                        <p>Mencari game yang sesuai...</p>
                    </div>
                </section>
            );
        }

        if (error) {
            return (
                <section>
                    <div className="game-list__status game-list__status--error">
                        <p>{error}</p>
                    </div>
                </section>
            );
        }

        if (!hasSearched) {
            return (
                <section>
                    <div className="game-list__status">
                        <p>
                            Masukkan kriteria di atas lalu klik{" "}
                            <strong>Cari Game</strong> untuk menampilkan hasil.
                        </p>
                    </div>
                </section>
            );
        }

        if (games.length === 0) {
            return (
                <section>
                    <div className="game-list__status">
                        <p>
                            Tidak ada game yang ditemukan untuk pencarian ini.
                        </p>
                    </div>
                </section>
            );
        }

        return (
            <section>
                {games.map(
                    ({
                        id,
                        name,
                        rating,
                        releasedDate,
                        backgroundImage,
                        platforms,
                        genre,
                        description,
                    }) => (
                        <GameCard
                            key={id}
                            name={name}
                            rating={rating}
                            releasedDate={releasedDate}
                            backgroundImage={backgroundImage}
                            platforms={platforms}
                            genre={genre}
                            description={description}
                        />
                    ),
                )}
            </section>
        );
    }
}
