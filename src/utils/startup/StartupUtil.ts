import CheckAuthenticationStatus from "./tasks/checkAuthenticationStatus";

abstract class Task {
  abstract run(): Promise<void>;
}

class StartupUtil {
  private static _instance: StartupUtil;
  private _tasks: Array<Task>;

  private constructor() {
    this._tasks = [new CheckAuthenticationStatus()];
  }

  public static get instance(): StartupUtil {
    if (!this._instance) {
      this._instance = new StartupUtil();
    }
    return this._instance;
  }

  public async run(): Promise<void> {
    // Runt the task syncronously.
    for (let index = 0; index < this._tasks.length; index++) {
      await this._tasks[index].run();
    }
  }
}

export default StartupUtil;
export { Task };
