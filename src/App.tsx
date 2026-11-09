import { Component, type ReactNode } from "react";
import GameList from "./assets/components/GameList";
import "./assets/scss/app.scss";

export default class App extends Component {
    render(): ReactNode {
        return (
            <main>
                <GameList />
            </main>
        );
    }
}
