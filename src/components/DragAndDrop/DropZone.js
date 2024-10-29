import React, { forwardRef } from 'react';
import styles from './styles/DragAndDrop.module.css';

const DropZone = forwardRef(({ onDrop, onDragOver, isDragging, droppedItems }, ref) => (
  <div
    ref={ref}
    className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`} 
    onDrop={onDrop}
    onDragOver={onDragOver}
  >
    <h2 className={styles.columnTitle}>Drop Zone</h2>
    {droppedItems}
  </div>
));

export default DropZone;
