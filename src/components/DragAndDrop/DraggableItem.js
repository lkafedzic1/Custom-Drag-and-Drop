import React from 'react';
import styles from './styles/DraggableItem.module.css';

const DraggableItem = ({ item, onDragStart, onDragEnd, isInDropZone, onReset, className }) => (
  <div
    className={`${styles.draggableItem} ${className}`}
    draggable={!isInDropZone}
    onDragStart={isInDropZone ? undefined : (e) => onDragStart(e, item)}
    onDragEnd={onDragEnd} 
  >
    {item.content}
    {isInDropZone && (
      <button
        className={styles.resetButton}
        onClick={(e) => {
          e.stopPropagation();
          onReset(item);
        }}
      >
        &#10005;
      </button>
    )}
  </div>
);

export default DraggableItem;
