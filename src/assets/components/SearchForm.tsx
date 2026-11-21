import {
    Component,
    type ChangeEvent,
    type SubmitEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import "../scss/search-form.scss";

export interface SearchFilters {
    description: string;
    genres: string[];
    releasedDate: string;
    platforms: string[];
}

interface SearchFormProps {
    onSearch: (filters: SearchFilters) => void;
    onReset?: () => void;
}

interface SearchFormState {
    description: string;
    genres: string[];
    genreInput: string;
    releasedDate: string;
    platforms: string[];
    platformInput: string;
}

export default class SearchForm extends Component<
    SearchFormProps,
    SearchFormState
> {
    private readonly MAX_WORDS = 300;

    constructor(props: SearchFormProps) {
        super(props);
        this.state = {
            description: "",
            genres: [],
            genreInput: "",
            releasedDate: "",
            platforms: [],
            platformInput: "",
        };
    }

    private countWords(text: string): number {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    }

    private enforceWordLimit(text: string): string {
        const trimmed = text.trim();
        if (!trimmed) return text;

        const words = trimmed.split(/\s+/);
        if (words.length <= this.MAX_WORDS) {
            return text;
        }

        const match = text.match(
            new RegExp(`^(?:\\s*\\S+){${this.MAX_WORDS}}`),
        );
        return match ? match[0] : words.slice(0, this.MAX_WORDS).join(" ");
    }

    private handleDescriptionChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
    ): void => {
        const limitedText = this.enforceWordLimit(e.target.value);
        this.setState({ description: limitedText });
    };

    private mergeUniqueTags(existing: string[], rawInput: string): string[] {
        const candidates = rawInput
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        if (candidates.length === 0) return existing;

        const updated = [...existing];
        for (const candidate of candidates) {
            const isDuplicate = updated.some(
                (item) => item.toLowerCase() === candidate.toLowerCase(),
            );
            if (!isDuplicate) {
                updated.push(candidate);
            }
        }
        return updated;
    }

    private addGenre = (): void => {
        const { genres, genreInput } = this.state;
        if (!genreInput.trim()) return;

        this.setState({
            genres: this.mergeUniqueTags(genres, genreInput),
            genreInput: "",
        });
    };

    private handleGenreKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            this.addGenre();
        } else if (
            e.key === "Backspace" &&
            this.state.genreInput === "" &&
            this.state.genres.length > 0
        ) {
            this.setState((prev) => ({
                genres: prev.genres.slice(0, -1),
            }));
        }
    };

    private removeGenre = (indexToRemove: number): void => {
        this.setState((prev) => ({
            genres: prev.genres.filter((_, index) => index !== indexToRemove),
        }));
    };

    private addPlatform = (): void => {
        const { platforms, platformInput } = this.state;
        if (!platformInput.trim()) return;

        this.setState({
            platforms: this.mergeUniqueTags(platforms, platformInput),
            platformInput: "",
        });
    };

    private handlePlatformKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            this.addPlatform();
        } else if (
            e.key === "Backspace" &&
            this.state.platformInput === "" &&
            this.state.platforms.length > 0
        ) {
            this.setState((prev) => ({
                platforms: prev.platforms.slice(0, -1),
            }));
        }
    };

    private removePlatform = (indexToRemove: number): void => {
        this.setState((prev) => ({
            platforms: prev.platforms.filter(
                (_, index) => index !== indexToRemove,
            ),
        }));
    };

    private handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const {
            description,
            genres,
            genreInput,
            releasedDate,
            platforms,
            platformInput,
        } = this.state;

        const finalGenres = this.mergeUniqueTags(genres, genreInput);
        const finalPlatforms = this.mergeUniqueTags(platforms, platformInput);

        this.setState({
            genres: finalGenres,
            genreInput: "",
            platforms: finalPlatforms,
            platformInput: "",
        });

        this.props.onSearch({
            description: description.trim(),
            genres: finalGenres,
            releasedDate,
            platforms: finalPlatforms,
        });
    };

    private handleReset = (): void => {
        const emptyFilters: SearchFilters = {
            description: "",
            genres: [],
            releasedDate: "",
            platforms: [],
        };

        this.setState({
            ...emptyFilters,
            genreInput: "",
            platformInput: "",
        });

        this.props.onSearch(emptyFilters);
        this.props.onReset?.();
    };

    render(): ReactNode {
        const {
            description,
            genres,
            genreInput,
            releasedDate,
            platforms,
            platformInput,
        } = this.state;

        const wordCount = this.countWords(description);
        const isLimitReached = wordCount >= this.MAX_WORDS;

        return (
            <div className="search-form-wrapper">
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <div className="search-form__header">
                        <h2>Cari Game</h2>
                        <p>
                            Deskripsikan game yang kamu inginkan atau filter
                            berdasarkan genre, tanggal rilis, dan platform.
                        </p>
                    </div>

                    {/* Deskripsi Pencarian (Maksimal 300 kata) */}
                    <div className="search-form__field">
                        <div className="search-form__label-row">
                            <label htmlFor="game-description">
                                Deskripsi Game yang Dicari
                            </label>
                            <span
                                className={`search-form__word-count ${
                                    isLimitReached ? "is-limit" : ""
                                }`}
                            >
                                {wordCount} / {this.MAX_WORDS} kata
                            </span>
                        </div>
                        <textarea
                            id="game-description"
                            rows={4}
                            placeholder="Contoh: Game action RPG open-world dengan cerita gelap, pertarungan menantang, dan eksplorasi luas..."
                            value={description}
                            onChange={this.handleDescriptionChange}
                        />
                    </div>

                    <div className="search-form__grid">
                        {/* Input Multi-Genre Manual */}
                        <div className="search-form__field">
                            <label htmlFor="game-genre">Genre (Manual)</label>
                            <div className="search-form__tag-input">
                                <input
                                    id="game-genre"
                                    type="text"
                                    placeholder="Ketik genre lalu Enter (mis. RPG, Action)"
                                    value={genreInput}
                                    onChange={(e) =>
                                        this.setState({
                                            genreInput: e.target.value,
                                        })
                                    }
                                    onKeyDown={this.handleGenreKeyDown}
                                />
                                <button
                                    type="button"
                                    className="search-form__add-btn"
                                    onClick={this.addGenre}
                                >
                                    + Tambah
                                </button>
                            </div>
                            {genres.length > 0 && (
                                <div className="search-form__tags">
                                    {genres.map((genre, index) => (
                                        <span
                                            key={`${genre}-${index}`}
                                            className="search-form__tag search-form__tag--genre"
                                        >
                                            {genre}
                                            <button
                                                type="button"
                                                aria-label={`Hapus genre ${genre}`}
                                                onClick={() =>
                                                    this.removeGenre(index)
                                                }
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Multi-Platform Manual */}
                        <div className="search-form__field">
                            <label htmlFor="game-platform">
                                Platform (Manual)
                            </label>
                            <div className="search-form__tag-input">
                                <input
                                    id="game-platform"
                                    type="text"
                                    placeholder="Ketik platform lalu Enter (mis. PC, PS5)"
                                    value={platformInput}
                                    onChange={(e) =>
                                        this.setState({
                                            platformInput: e.target.value,
                                        })
                                    }
                                    onKeyDown={this.handlePlatformKeyDown}
                                />
                                <button
                                    type="button"
                                    className="search-form__add-btn"
                                    onClick={this.addPlatform}
                                >
                                    + Tambah
                                </button>
                            </div>
                            {platforms.length > 0 && (
                                <div className="search-form__tags">
                                    {platforms.map((platform, index) => (
                                        <span
                                            key={`${platform}-${index}`}
                                            className="search-form__tag search-form__tag--platform"
                                        >
                                            {platform}
                                            <button
                                                type="button"
                                                aria-label={`Hapus platform ${platform}`}
                                                onClick={() =>
                                                    this.removePlatform(index)
                                                }
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rentan Tahun Rilis & Tombol Aksi */}
                    <div className="search-form__bottom-row">
                        <div className="search-form__field search-form__field--date">
                            <label htmlFor="game-release-date">
                                Rentan Tahun Rilis
                            </label>
                            <input
                                id="game-release-date"
                                type="text"
                                value={releasedDate}
                                placeholder="Contoh: 2000 - 2010"
                                onChange={(e) =>
                                    this.setState({
                                        releasedDate: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="search-form__actions">
                            <button
                                type="button"
                                className="search-form__btn search-form__btn--reset"
                                onClick={this.handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="search-form__btn search-form__btn--submit"
                            >
                                Cari Game
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
