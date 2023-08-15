import { MouseEventHandler } from "react";

export interface GallerySwiperProps{
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    imageArry: any[];
}