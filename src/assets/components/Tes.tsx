import { Component, type ReactNode } from "react";

interface AppProps<T> {
    sesuatu: T[];
    sesuatuRender: (item: T) => ReactNode;
}

export default class Tes<T extends ReactNode> extends Component<AppProps<T>> {
    render() {
        const { sesuatu, sesuatuRender } = this.props;

        return (
            <div>
                {sesuatu.map((item, index) => {
                    return <p key={index}>{sesuatuRender(item)}</p>;
                })}
            </div>
        );
    }
}
