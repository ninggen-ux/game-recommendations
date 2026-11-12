import { Component, type ReactNode } from "react";
import "../scss/game-list.scss";

interface PlatformProps {
    platform: string;
}

export default class Platform extends Component<PlatformProps> {
    constructor(props: PlatformProps) {
        super(props);
    }

    render(): ReactNode {
        const { platform } = this.props;

        return <p className="platform">{platform}</p>;
    }
}
