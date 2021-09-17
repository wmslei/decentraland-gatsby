declare const sizes: {
    small: {
        width: number;
        height: number;
    };
    large: {
        width: number;
        height: number;
    };
};
export default function newPopupWindow(url: string, size?: keyof typeof sizes): void;
export {};
