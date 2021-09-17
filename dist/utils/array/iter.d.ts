export default function iter<T>(amount: number, map: (currentIndex: number, maxIndex: number) => T): T[];
