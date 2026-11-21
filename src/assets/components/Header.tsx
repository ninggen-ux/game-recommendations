import { Component, type ReactNode } from "react";
import "../scss/header.scss";

export default class Header extends Component {
    render(): ReactNode {
        return (
            <header className="app-header">
                <div className="app-header__container">
                    <h1 className="app-header__title">
                        Games<span>Poi</span>
                    </h1>
                </div>
            </header>
        );
    }
}
