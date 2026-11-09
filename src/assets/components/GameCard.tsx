import { Component, type ReactNode } from "react";

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
        return;
    }
}
