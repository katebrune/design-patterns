# Abstract Factory

The intent of the abstract factory pattern is to create families of related or dependent objects without specifying their concrete classes. The motivation behind this pattern is to abstract away look-and-feel standards from application logic. It's all about writing your client code to an interface instead of a concrete implementation.

This pattern is useful to apply when:

- a system should be independent of how its products are created, composed, and represented
- a system should be configured with one of multiple families of products
- a family of related product objects is designed to be used together, and you need to enforce this constraint
- you want to provide a class library of products, and you want to reveal just their interfaces, not their implementations.

## Pattern Structure

A TypeScript example of this pattern is in `pattern.ts`.

```mermaid
classDiagram
    class AbstractFactory {
        +createProductA()
        +createProductB()
    }

    class ConcreteFactory1 {
        +createProductA()
        +createProductB()
    }
    AbstractFactory <|--ConcreteFactory1

    class ConcreteFactory2 {
        +createProductA()
        +createProductB()
    }
    AbstractFactory <|-- ConcreteFactory2

    Client --> AbstractFactory

    Client --> AbstractProductA
    Client --> AbstractProductB

    AbstractProductA <|-- ProductA1
    AbstractProductA <|-- ProductA2

    AbstractProductB <|-- ProductB1
    AbstractProductB <|-- ProductB2

    ProductA1 <.. ConcreteFactory1
    ProductB1 <.. ConcreteFactory1

    ProductA2 <.. ConcreteFactory2
    ProductB2 <.. ConcreteFactory2

```

## Example Structure

In my example in `example.ts` we use the abstract factory pattern to abstract the look-and-feel standards of the logs away from the logging mechanism

```mermaid
classDiagram
    class ILogger {
        +log(): Log
        +warn(): WarningLog
		+error(): ErrorLog
    }

    class StandardLogger {
        +log(): Log
		+warn(): WarningLog
		+error(): ErrorLog
    }
    ILogger <|-- StandardLogger

    class EmojiLogger {
        +log(): Log
		+warn(): WarningLog
		+error(): ErrorLog
    }
    ILogger <|-- EmojiLogger

    Client --> ILogger

	class Log {
		message: string
		+write():void
	}

	class WarningLog {
		message: string
		+write():void
	}

	class ErrorLog {
		message: string
		+write():void
	}

    Client --> Log
    Client --> WarningLog
	Client --> ErrorLog


	class StandardLog {
		message: string
		+write():void
	}
    Log <|-- StandardLog
	class EmojiLog {
		message: string
		+write():void
	}
    Log <|-- EmojiLog

	class StandardWarningLog{
		message: string
		write():void
	}
    WarningLog <|-- StandardWarningLog
	class EmojiWarningLog {
		message: string
		+write():void
	}
	WarningLog <|-- EmojiWarningLog

	class StandardErrorLog {
		message: string
		+write():void
	}
	ErrorLog <|-- StandardErrorLog
	class EmojiErrorLog {
		message: string
		+write():void
	}
	ErrorLog <|-- EmojiErrorLog

	StandardLog <.. StandardLogger
	StandardWarningLog <.. StandardLogger
	StandardErrorLog <.. StandardLogger

	EmojiLog <.. EmojiLogger
	EmojiWarningLog <.. EmojiLogger
	EmojiErrorLog <.. EmojiLogger

```
