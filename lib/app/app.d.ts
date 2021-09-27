import { Initiate } from './initiate';
/**
 * @deprecated since version 0.2.0, we are migrating to function appFlow
 */
export declare class App {
    private readonly __initList;
    constructor(...args: (Initiate | Initiate[])[]);
    initiate(): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map