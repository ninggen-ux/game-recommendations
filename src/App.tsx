import { Component } from "react";
import Tes from "./assets/components/Tes.tsx";
import "./assets/scss/app.scss";

export default class App extends Component {
    render() {
        const sesuatu: string[] = [
            "Apel",
            "Semangka",
            "Melon",
            "Jeruk",
            "Salak",
        ];

        return (
            <main>
                <Tes<string> sesuatu={sesuatu} sesuatuRender={(item) => item} />
            </main>
        );
    }
}
