import chalk from "chalk";

abstract class ILogger {
  abstract name: string;
  abstract log(s: string): Log;
  abstract warn(s: string): WarningLog;
  abstract error(s: string): ErrorLog;
}

interface Log {
  message: string;
  write(): void;
}

interface WarningLog {
  message: string;
  write(): void;
}

interface ErrorLog {
  message: string;
  write(): void;
}

class StandardLogger extends ILogger {
  name = "StandardLogger";
  log(s: string): Log {
    return new StandardLog(s);
  }
  warn(s: string): WarningLog {
    return new StandardWarningLog(s);
  }
  error(s: string): ErrorLog {
    return new StandardErrorLog(s);
  }
}

class StandardLog implements Log {
  public message: string;
  constructor(s: string) {
    this.message = chalk.whiteBright(s);
  }
  write(): void {
    console.log(this.message);
  }
}

class StandardWarningLog implements WarningLog {
  public message: string;
  constructor(s: string) {
    this.message = chalk.yellow(s);
  }
  write(): void {
    console.log(this.message);
  }
}

class StandardErrorLog implements ErrorLog {
  public message: string;
  constructor(s: string) {
    this.message = chalk.redBright(s);
  }
  write(): void {
    console.log(this.message);
  }
}

class EmojiLogger extends ILogger {
  name = "EmojiLogger";
  log(s: string): Log {
    return new EmojiLog(s);
  }
  warn(s: string): WarningLog {
    return new EmojiWarningLog(s);
  }
  error(s: string): ErrorLog {
    return new EmojiErrorLog(s);
  }
}

class EmojiLog implements Log {
  public message: string;
  constructor(s: string) {
    this.message = `⚡️ ` + chalk.blue(s);
  }
  write() {
    console.log(this.message);
  }
}

class EmojiWarningLog implements WarningLog {
  public message: string;
  constructor(s: string) {
    this.message = `⚠️  ` + chalk.yellow(s);
  }
  write() {
    console.log(this.message);
  }
}

class EmojiErrorLog implements ErrorLog {
  public message: string;
  constructor(s: string) {
    this.message = `🛑 ` + chalk.red(s);
  }
  write() {
    console.log(this.message);
  }
}

function clientCode(logger: ILogger) {
  logger.log(`This is a log from ${logger.name}`).write();
  logger.warn(`This is a warning log from ${logger.name}`).write();
  logger.error(`This is an error log from ${logger.name}`).write();
}

clientCode(new StandardLogger());
clientCode(new EmojiLogger());
