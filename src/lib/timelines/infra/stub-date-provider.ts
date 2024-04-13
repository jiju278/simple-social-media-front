import { DateProvider } from '@/lib/timelines/model/date-provider';

export class StubDateProvider implements DateProvider {
  now = new Date();

  getNow(): Date {
    return this.now;
  }
}
