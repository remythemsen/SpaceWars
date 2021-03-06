module SpaceWars.Interfaces {
    export interface IAsset {
        id:number;
        name:string;
        asset_key:string;
        type:string;
        width:number;
        height:number;
        path:string;
        created_at:string;
        update_at:string;
    }
}