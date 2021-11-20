import { AppFlow } from './app-flow';
export declare enum AppStarterStatus {
    STARTED = "started",
    STOPPED = "stopped"
}
export declare type AppFlowObjectType<T extends AppFlow = any> = {
    new (): T;
};
export declare class AppStarter {
    protected _flow: AppFlow;
    protected _status: AppStarterStatus;
    constructor(appFlow: AppFlow);
    start(): Promise<void>;
    protected _registerOnExit(): void;
    protected _gracefulStop(): Promise<void>;
    protected _onError(err: Error): Promise<void>;
    stop(): Promise<void>;
}
export declare const appStarterFactory: (appFlow: AppFlowObjectType) => AppStarter;
//# sourceMappingURL=app-starter.d.ts.map