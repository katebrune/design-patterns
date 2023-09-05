interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

interface AbstractProductA {
  getText(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  public getText(): string {
    return "Hello from A1";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public getText(): string {
    return "Hello from A2";
  }
}

interface AbstractProductB {
  getText(): string;

  collabWith(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  public getText(): string {
    return "Hello from B1";
  }

  public collabWith(collaborator: AbstractProductA): string {
    return `${this.getText()} and ${collaborator.getText()}`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  public getText(): string {
    return "Hello from B2";
  }

  public collabWith(collaborator: AbstractProductA): string {
    return `${this.getText()} and ${collaborator.getText()}`;
  }
}

function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productA.getText());
  console.log(productB.getText());
  console.log(productB.collabWith(productA));
}

console.log("--ConcreteFactory1--");
clientCode(new ConcreteFactory1());
console.log("--ConcreteFactory2--");
clientCode(new ConcreteFactory2());
