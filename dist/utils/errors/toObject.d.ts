export default function toObject(err?: Error | null): {
    name: string;
    message: string;
    stack: string | undefined;
} | null | undefined;
