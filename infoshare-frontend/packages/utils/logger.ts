class Logger {
  log(...args: unknown[]) {
    console.log(...args);
  }

  error(...args: unknown[]) {
    console.error(...args);
  }

  warn(...args: unknown[]) {
    console.warn(...args);
  }

  info(...args: unknown[]) {
    console.info(...args);
  }
}

export default new Logger();
