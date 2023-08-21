import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { appendFile, mkdir, writeFile } from 'fs/promises';
import * as path from 'path';
import * as logrotator from 'logrotator';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  // constructor() {
  //   super();
  // }
  private readonly configService = new ConfigService();
  fsLogger = new ConsoleLogger('FS');
  async customHTTPLog(message: string) {
    this.log(message);
    const logsPath = path.join(__dirname, '../../logs');
    const fileName = `mylogs.log`;
    const fullPath = path.join(logsPath, fileName);
    if (!existsSync(logsPath)) await mkdir(logsPath);
    if (!existsSync(fullPath)) {
      await writeFile(fullPath, '');
    }
    const rotator = logrotator.rotator;
    rotator.register(fullPath, {
      schedule: '10s',
      size: this.configService.get('LOG_FILE_SIZE'),
      compress: true,
      count: 3,
      format: function () {
        return new Date().toISOString();
      },
    });
    await appendFile(fullPath, message);
    this.fsLogger.log(`Log added to file ${fullPath}`);
  }
  getTime() {
    return new Date().toISOString();
  }
}
