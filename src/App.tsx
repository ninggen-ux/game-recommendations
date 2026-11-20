import { Component, type ReactNode } from "react";
import GameList, { type Game } from "./assets/components/GameList";
import SearchForm, { type SearchFilters } from "./assets/components/SearchForm";
import "./assets/scss/app.scss";

interface AppState {
    games: Game[];
    isLoading: boolean;
    error: string | null;
    hasSearched: boolean;
}

// Ganti dengan URL endpoint API dari teman Anda
const GAME_SEARCH_API_URL = "http://localhost:3000/api/recommend";

export default class App extends Component<Record<string, never>, AppState> {
    private abortController: AbortController | null = null;

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            games: [],
            isLoading: false,
            error: null,
            hasSearched: false,
        };
    }

    componentWillUnmount(): void {
        this.abortController?.abort();
    }

    /**
     * Menyesuaikan struktur JSON dari API teman Anda agar cocok dengan props GameCard.
     * Sesuaikan nama field di bawah jika key dari API berbeda (misal snake_case).
     */
    private normalizeGames(rawResponse: unknown): Game[] {
        const list = Array.isArray(rawResponse)
            ? rawResponse
            : Array.isArray((rawResponse as { data?: unknown[] })?.data)
              ? (rawResponse as { data: unknown[] }).data
              : Array.isArray((rawResponse as { results?: unknown[] })?.results)
                ? (rawResponse as { results: unknown[] }).results
                : [];

        return list.map((item, index) => {
            const g = item as Record<string, unknown>;
            return {
                id: (g.id as string | number) ?? index,
                name: String(g.name ?? g.title ?? "Untitled Game"),
                rating: Number(g.rating ?? 0),
                releasedDate: String(
                    g.releasedDate ?? g.released_date ?? g.released ?? "",
                ),
                backgroundImage: String(
                    g.backgroundImage ?? g.background_image ?? g.image ?? "",
                ),
                platforms: Array.isArray(g.platforms)
                    ? g.platforms.map(String)
                    : [],
                genre: Array.isArray(g.genre)
                    ? g.genre.map(String)
                    : Array.isArray(g.genres)
                      ? g.genres.map(String)
                      : [],
                description: String(g.description ?? g.summary ?? ""),
            };
        });
    }

    private handleSearch = async (filters: SearchFilters): Promise<void> => {
        this.abortController?.abort();
        const controller = new AbortController();
        this.abortController = controller;

        this.setState({
            isLoading: true,
            error: null,
            hasSearched: true,
        });

        try {
            // Menggunakan POST dengan JSON body.
            // (Jika API teman Anda memakai GET query params, lihat catatan di bawah)
            const response = await fetch(GAME_SEARCH_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: filters.description,
                    genres: filters.genres,
                    releasedDate: filters.releasedDate,
                    platforms: filters.platforms,
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(
                    `Gagal mengambil data game (Status: ${response.status})`,
                );
            }

            const rawData: unknown = await response.json();
            const normalizedGames = this.normalizeGames(rawData);

            this.setState({
                games: normalizedGames,
                isLoading: false,
            });
        } catch (err) {
            if ((err as Error).name === "AbortError") return;

            this.setState({
                games: [],
                isLoading: false,
                error:
                    err instanceof Error
                        ? err.message
                        : "Terjadi kesalahan saat menghubungi server API.",
            });
        }
    };

    private handleReset = (): void => {
        this.abortController?.abort();
        this.setState({
            games: [],
            isLoading: false,
            error: null,
            hasSearched: false,
        });
    };

    render(): ReactNode {
        const { games, isLoading, error, hasSearched } = this.state;

        return (
            <main>
                <SearchForm
                    onSearch={this.handleSearch}
                    onReset={this.handleReset}
                />
                <GameList
                    games={games}
                    isLoading={isLoading}
                    error={error}
                    hasSearched={hasSearched}
                />
            </main>
        );
    }
}
