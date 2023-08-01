import { MouseEventHandler } from "react";

export interface LightEdgeButtonProps{
    title?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode | React.ReactNode[];
}