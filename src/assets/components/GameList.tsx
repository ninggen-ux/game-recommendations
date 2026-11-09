import { Component, type ReactNode } from "react";
import GameCard from "./GameCard.tsx";
import gameDummyData from "../data/gameDummyData.json";

export default class GameList extends Component {
    render(): ReactNode {
        return (
            <section>
                {gameDummyData.map(
                    ({
                        id,
                        name,
                        rating,
                        releasedDate,
                        backgroundImage,
                        platforms,
                    }) => {
                        return (
                            <GameCard
                                key={id}
                                name={name}
                                rating={rating}
                                releasedDate={releasedDate}
                                backgroundImage={backgroundImage}
                                platforms={platforms}
                            />
                        );
                    },
                )}
            </section>
        );
    }
}
