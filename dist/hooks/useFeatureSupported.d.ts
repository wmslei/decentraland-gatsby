declare const features: {
    Crypto: () => boolean;
    File: () => boolean;
    FileSystem: () => boolean;
    Notification: () => boolean;
    PushManager: () => boolean;
    ServiceWorker: () => boolean;
    Share: () => boolean;
};
export default function useFeatureSupported(feature: keyof typeof features): boolean;
export declare function useCryptoSupported(): boolean;
export declare function useFileSupported(): boolean;
export declare function useFileSystemSupported(): boolean;
export declare function useNotificationSupported(): boolean;
export declare function usePushManagerSupported(): boolean;
export declare function useServiceWorkerSupported(): boolean;
export declare function useShareSupported(): boolean;
export {};
