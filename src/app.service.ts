import { Injectable } from '@nestjs/common';
import { ConfigService } from './services/config.service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;

  constructor(config: ConfigService) {
    // Please take note that this check is case sensitive!
    this.isAuthEnabled =
      config.get('IS_AUTH_ENABLED') === 'true' ? true : false;
  }

  root(): string {
    return 'Hello World!';
  }
}
