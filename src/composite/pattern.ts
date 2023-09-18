interface Component {
  render: () => void;
}

class Leaf implements Component {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public render() {
    console.log("Rendering text: ", this.text);
  }
}

class Composite implements Component {
  private children: Component[];

  constructor() {
    this.children = [];
  }

  public add(child: Component): void {
    this.children.push(child);
  }

  public render() {
    this.children.forEach((child) => child.render());
  }
}

const leaf1 = new Leaf("Leaf 1");
const leaf2 = new Leaf("Leaf 2");
const composite = new Composite();
composite.add(leaf1);
composite.add(leaf2);
composite.render();
