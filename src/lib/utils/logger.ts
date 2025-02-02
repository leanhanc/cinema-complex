import util from 'util';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerOptions {
	timestamp?: boolean;
}

type LogMessage = string | Record<string, object | string>;

class Logger {
	private showTimestamp: boolean;

	constructor(options: LoggerOptions = {}) {
		this.showTimestamp = options.timestamp ?? true;
	}

	private formatMessage(
		level: LogLevel,
		message: LogMessage,
		tag = 'APP',
	): string {
		const timestamp = this.showTimestamp ? `[${new Date().toISOString()}]` : '';
		const tagStr = `[${tag}]`;
		const levelStr = `[${level.toUpperCase()}]`;

		const formattedMessage =
			typeof message === 'object'
				? util.inspect(message, { depth: null, colors: true })
				: message;

		return `${timestamp} ${tagStr} ${levelStr} ${formattedMessage}`;
	}

	info(message: LogMessage, tag?: string): void {
		console.log(this.formatMessage('info', message, tag));
	}

	warn(message: LogMessage, tag?: string): void {
		console.warn(this.formatMessage('warn', message, tag));
	}

	error(message: LogMessage, tag?: string): void {
		console.error(this.formatMessage('error', message, tag));
	}

	debug(message: LogMessage, tag?: string): void {
		console.debug(this.formatMessage('debug', message, tag));
	}
}

// Export a default logger instance
export const logger = new Logger();

// Export the class for custom instances
export default Logger;
