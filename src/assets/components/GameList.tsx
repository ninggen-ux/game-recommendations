import { Component, type ReactNode } from "react";
import GameCard from "./GameCard";
import GameDetailModal from "./GameDetailModal";
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

interface GameListState {
    selectedGame: Game | null;
}

export default class GameList extends Component<GameListProps, GameListState> {
    constructor(props: GameListProps) {
        super(props);
        this.state = {
            selectedGame: null,
        };
    }

    private handleSelectGame = (game: Game): void => {
        this.setState({ selectedGame: game });
    };

    private handleCloseModal = (): void => {
        this.setState({ selectedGame: null });
    };

    render(): ReactNode {
        const { games, isLoading, error, hasSearched } = this.props;
        const { selectedGame } = this.state;

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
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        name={game.name}
                        rating={game.rating}
                        releasedDate={game.releasedDate}
                        backgroundImage={game.backgroundImage}
                        platforms={game.platforms}
                        genre={game.genre}
                        description={game.description}
                        onClick={() => this.handleSelectGame(game)}
                    />
                ))}

                {selectedGame && (
                    <GameDetailModal
                        game={selectedGame}
                        onClose={this.handleCloseModal}
                    />
                )}
            </section>
        );
    }
}
