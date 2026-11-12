import { Component, type ReactNode } from "react";
import Platform from "./Platform.tsx";
import "../scss/game-list.scss";

interface GameCardProps {
    name: string;
    rating: number;
    releasedDate: string;
    backgroundImage: string;
    platforms: string[];
}

export default class GameCard extends Component<GameCardProps> {
    constructor(props: GameCardProps) {
        super(props);
    }

    render(): ReactNode {
        const { name, rating, releasedDate, backgroundImage, platforms } =
            this.props;

        return (
            <div>
                <img src={backgroundImage} alt={name} />
                <div>
                    <h1>{name}</h1>
                    <div>
                        <p>{rating}</p>
                        <p>{releasedDate}</p>
                        {platforms.map((item, index) => {
                            return <Platform key={index} platform={item} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
