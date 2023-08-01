import React from "react"
import styles from "../styles/LightEdge.module.css"
import { LightEdgeButtonProps } from "../Types/LightEdgeButton";


export const LightEdgeButton = ({title, handleClick, children}: LightEdgeButtonProps) =>{
    return (
        <div className="flex justify-center items-center overflow-hidden min-h-screen"> 
            <div className={`relative px-3 py-5 text-lg overflow-hidden ${styles.LightEdgeBtn}`}>{children}</div>
        </div>
    )
}
