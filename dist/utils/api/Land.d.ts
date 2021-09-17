import API from './API';
import Options from './Options';
export declare type GetListOptions = {
    status?: 'open' | 'cancelled' | 'sold';
    sortBy?: 'price' | 'created_at' | 'block_time_updated_at' | 'expires_at';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
};
export declare type GetImageOptions = {
    width?: number;
    height?: number;
    size?: number;
    publications?: boolean;
};
export declare type GetMapImageOptions = GetImageOptions & {
    center?: [number, number];
    selected?: [number, number][];
};
declare type Token = {
    id: string;
    name: string;
    description: string;
    image: string;
    external_url: string;
    background_color: string;
};
export declare type Parcel = Token & {
    attributes: {
        trait_type: 'X' | 'Y' | 'Distance to District' | 'Distance to Road';
        value: number;
        display_type: 'number';
    }[];
};
export declare type Estate = Token & {
    attributes: {
        trait_type: 'Size' | 'Distance to District' | 'Distance to Road';
        value: number;
        display_type: 'number';
    }[];
};
export declare type Tile = {
    id: string;
    x: number;
    y: number;
    type: 'owned' | 'unowned' | 'plaza' | 'road' | 'district';
    top: boolean;
    left: boolean;
    topLeft: boolean;
    updatedAt: number;
    name?: string;
    owner?: string;
    estateId?: string;
    tokenId?: string;
    price?: number;
};
export declare type MapContent = {
    assets: {
        parcels: Parcel[];
        estates: Estate[];
    };
    total: number;
};
export default class Land extends API {
    static Url: string;
    static Cache: Map<string, Land>;
    static get(): Land;
    static from(baseUrl: string): Land;
    static encodeParcelId(coordinates: [number, number]): string;
    static decodeParcelId(parcelId: string): [number, number];
    fetch<T extends object>(url: string, options?: Options): Promise<T>;
    getPositionName(position: [number, number]): Promise<string>;
    getParcel(position: [number, number]): Promise<Parcel>;
    getEstate(id: number | string): Promise<Estate>;
    getParcels(options?: GetListOptions): Promise<Parcel[]>;
    getEstates(options?: GetListOptions): Promise<Estate[]>;
    /** @deprecated */
    getMapContent(nw: [number, number], se: [number, number]): Promise<MapContent>;
    /**
     * Get a map of tiles
     * @param position1
     * @param position2
     * @param options
     * @returns
     */
    getTiles(position1: [number, number], position2: [number, number], options?: {
        include?: (keyof Tile)[];
        exclude?: (keyof Tile)[];
    }): Promise<Record<string, Tile>>;
    getTile(position: [number, number], options?: {
        include?: (keyof Tile)[];
        exclude?: (keyof Tile)[];
    }): Promise<Tile | null>;
    encodeParcelId(coordinates: [number, number]): string;
    decodeParcelId(parcelId: string): [number, number];
    getImage(options?: GetMapImageOptions): string;
    getParcelImage(coordinates: [number, number], options?: GetImageOptions): string;
    getEstateImage(id: number | string, options?: GetImageOptions): string;
}
export {};
