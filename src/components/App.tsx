import * as React from "react";

interface IAppProps {
  title: string;
}

export class App extends React.Component<IAppProps, {}> {
  public render(): JSX.Element {
    return <h1>{this.props.title}</h1>;
  }
}
