export declare const notificationMessage = "Wootom was called and says hello!";
export declare function activate(): void;
export declare function deactivate(): void;
export declare function serialize(): void;
export declare function hello(): void;
export declare const config: {
    mathjaxMacros: {
        title: string;
        description: string;
        type: string;
        default: string;
    };
    tikzPreamble: {
        title: string;
        description: string;
        type: string;
        default: string;
    };
    tikzSvgStyle: {
        title: string;
        description: string;
        type: string;
        default: string;
        enum: {
            value: string;
            description: string;
        }[];
    };
};
