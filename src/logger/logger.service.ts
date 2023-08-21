import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  fsLogger = new ConsoleLogger('FS');
  async customHTTPLog(message: string) {
    this.log(message);
    const logsPath = path.join(__dirname, '../../logs');
    const fileName = `HTTP:${this.getTime()}.txt`;
    const fullPath = path.join(logsPath, fileName);
    if (!existsSync(logsPath)) await mkdir(logsPath);
    await writeFile(fullPath, message);
    this.fsLogger.log(`Log file was created at ${fullPath}`);
  }
  getTime() {
    return new Date().toISOString();
  }
}
