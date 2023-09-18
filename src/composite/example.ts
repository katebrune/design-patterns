import boxen, { type Options as BoxenOptions } from "boxen";
import chalk from "chalk";

interface Component {
  render: () => string;
}

class Client {
  constructor(private component: Component) {}

  public renderToConsole(): void {
    console.log(this.component.render());
  }
}

export class Text implements Component {
  constructor(
    private text: string,
    private color: "blue" | "green" | "yellow" | "red" | "white" = "white"
  ) {}

  public render(): string {
    switch (this.color) {
      case "blue":
        return chalk.blue(this.text);
      case "green":
        return chalk.green(this.text);
      case "yellow":
        return chalk.yellow(this.text);
      case "red":
        return chalk.red(this.text);
      default:
        return chalk.whiteBright(this.text);
    }
  }
}

export class Box implements Component {
  private options: BoxenOptions;
  private children: Component[];

  constructor(props?: { options?: BoxenOptions; children?: Component[] }) {
    this.options = props?.options || {};
    this.children = props?.children || [];
  }

  public render(): string {
    const content = this.children
      .map((component) => component.render())
      .join("\n");
    return boxen(content, { ...this.options, titleAlignment: "center" });
  }
}

const TodaysOverview = new Box({
  options: { padding: 2, borderColor: "blue", title: "Today's Overview" },
  children: [
    new Text("Good morning, Kate! Today is Monday September 18, 2023"),
    new Box({
      options: { padding: 1, title: "Weather", borderColor: "green" },
      children: [
        new Text("The current temperature is 67°", "green"),
        new Text("Today's high is 69° at 3pm", "green"),
      ],
    }),
    new Box({
      options: { padding: 1, title: "Tasks" },
      children: [
        new Text("- Laundry", "red"),
        new Text("- Grocery shop", "red"),
        new Text("- Listen to The National's new album", "yellow"),
      ],
    }),
  ],
});

new Client(TodaysOverview).renderToConsole();
