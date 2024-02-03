import { LocalStorageKey, LocalStorageProvider } from "../LocalStorageProvider";
import moment from "moment-timezone";

class TimeConfigProvider {
  private static _instance: TimeConfigProvider;
  private static defaultTimeformat = "DD/MM/yy hh:MMa (Z)";
  private _tz: string;
  private _timeFormat: string;

  private constructor() {
    try {
      this._tz = LocalStorageProvider.instance.getItem(
        LocalStorageKey.TimeZone
      );
    } catch (e) {
      this._tz = moment.tz.guess(false);
    }

    try {
      this._timeFormat = LocalStorageProvider.instance.getItem(
        LocalStorageKey.TimeFormat
      );
    } catch (e) {
      this._timeFormat = TimeConfigProvider.defaultTimeformat;
    }
  }

  public setTimezone(tz: string) {
    this._tz = tz;
    LocalStorageProvider.instance.setItem(LocalStorageKey.TimeZone, tz);
  }

  public setTimeFormat(format: string) {
    this._timeFormat = format;
    if (format === TimeConfigProvider.defaultTimeformat) {
      LocalStorageProvider.instance.removeItem(LocalStorageKey.TimeFormat);
      return;
    }
    LocalStorageProvider.instance.setItem(LocalStorageKey.TimeFormat, format);
  }

  public getDisplayDateTime(inputDateTime: string): string {
    return this.getDisplayDateTimeWithCustomFormat(
      inputDateTime,
      this._timeFormat
    );
  }

  public getDisplayDateTimeWithCustomFormat(
    inputDateTime: string,
    format: string
  ): string {
    const localTimeZone = moment.tz.guess();
    return moment(inputDateTime).tz(localTimeZone).format(format);
  }

  public getTimestamp(inputDateTime: string) {
    return moment(inputDateTime).unix();
  }

  public get timeFormat(): string {
    return this._timeFormat;
  }

  public static get instance(): TimeConfigProvider {
    if (!this._instance) {
      this._instance = new TimeConfigProvider();
    }
    return this._instance;
  }
}

export { TimeConfigProvider };
