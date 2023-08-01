import React from "react";
import { UserIcon, SquaresPlusIcon, ChatBubbleLeftRightIcon, RectangleStackIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import styles from "../styles/LightEdge.module.css"
import { MenuButtonListProps } from "../Types/MenuButtonList";

export default function MenuButtonList({handleClick}: MenuButtonListProps) {

  const setMenuButtonValue = (event : any) =>{
    if(handleClick){
      handleClick(event.target.value);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <ul className={`relative h-28 flex justify-center items-center rounded-lg ${styles.ButtomListBox}`}>
        {/* <li className={`relative h-28 ${styles.ButtomListItem}`}>
          <button className={`relative text-white inline-block ${styles.ButtomListLink}`} value={""} onClick={setMenuButtonValue}>
            <UserIcon
              className={`pointer-events-none w-20 h-20 ${styles.ButtomListIcon}`}
              aria-hidden="true"
            />
          </button>
          <div className={styles.ButtomListMarker}></div>
        </li> */}
        <li className={`relative h-28 ${styles.ButtomListItem}`}>
          <button className={`relative text-white inline-block ${styles.ButtomListLink}`} value={"detail"} onClick={setMenuButtonValue}>
            <SquaresPlusIcon
              className={`pointer-events-none w-20 h-20 ${styles.ButtomListIcon}`}
              aria-hidden="true"
            />
          </button>
          <div className={styles.ButtomListMarker}></div>
        </li>
        <li className={`relative h-28 ${styles.ButtomListItem}`}>
          <button className={`relative text-white inline-block ${styles.ButtomListLink}`} value={"volume"} onClick={setMenuButtonValue}>
            <RectangleStackIcon
              className={`pointer-events-none w-20 h-20 ${styles.ButtomListIcon}`}
              aria-hidden="true"
            />
          </button>
          <div className={styles.ButtomListMarker}></div>
        </li>
        <li className={`relative h-28 ${styles.ButtomListItem}`}>
          <button className={`relative text-white inline-block ${styles.ButtomListLink}`} value={"message"} onClick={setMenuButtonValue}>
            <ChatBubbleLeftRightIcon
              className={`pointer-events-none w-20 h-20 ${styles.ButtomListIcon}`}
              aria-hidden="true"
            />
          </button>
          <div className={styles.ButtomListMarker}></div>
        </li>
        <li className={`relative h-28 ${styles.ButtomListItem}`}>
          <button className={`relative text-white inline-block ${styles.ButtomListLink}`} value={"shopping"} onClick={setMenuButtonValue}>
            <ShoppingBagIcon
              className={`pointer-events-none w-20 h-20 ${styles.ButtomListIcon}`}
              aria-hidden="true"
            />
          </button>
          <div className={styles.ButtomListMarker}></div>
        </li>
      </ul>
    </div>
  );
}
