import React, { useState, useRef, useEffect } from 'react';
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';
import styles from './styles/DragAndDrop.module.css';

const DragAndDrop = ({ items }) => {
  const [listItems, setListItems] = useState(items);
  const [droppedItems, setDroppedItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false); 
  const [dragOverPosition, setDragOverPosition] = useState(null);
  const dropZoneRef = useRef(null); 

  const handleDropItem = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dropZoneRef.current) {
      console.debug('Drop Zone ref not found');
      return;
    }

    try {
      const { item, newDroppedItems } = GetDroppedItemsWithNewItem(e);
  
      setListItems(listItems.filter((listItem) => listItem.id !== item.id));
      setDroppedItems(newDroppedItems);
      setIsDragging(false);
      setDragOverPosition(null);
    }
    catch (error) {
      console.error('Error dropping item:', error);
    }
  };

  const GetDroppedItemsWithNewItem = (e) => {
    const item = JSON.parse(e.dataTransfer.getData('text/plain'));
    const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - dropZoneRect.left) / dropZoneRect.width;
    const relativeY = (e.clientY - dropZoneRect.top) / dropZoneRect.height;

    const newItem = { ...item, relativePosition: { x: relativeX, y: relativeY } };

    const newDroppedItems = [...droppedItems, newItem].sort((a, b) => {
      if (a.relativePosition.y === b.relativePosition.y) {
        return a.relativePosition.x - b.relativePosition.x;
      }
      return a.relativePosition.y - b.relativePosition.y;
    });
    return { item, newDroppedItems };
  }

  const handleDragStartWrapper = (e, item) => {
    setIsDragging(true); 
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragEndWrapper = () => {
    setIsDragging(false); 
  };

  const handleResetItem = (item) => {
    setDroppedItems(droppedItems.filter((droppedItem) => droppedItem.id !== item.id));
    setListItems((prev) => [...prev, item]);
  };

  const handleDragOverDropZone = (e) => {
    e.preventDefault();
    const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - dropZoneRect.left) / dropZoneRect.width;
    const relativeY = (e.clientY - dropZoneRect.top) / dropZoneRect.height;

    const newItem = { ...{id: 0}, relativePosition: { x: relativeX, y: relativeY } };
    
    const newDroppedItems = [...droppedItems, newItem].sort((a, b) => {
      if (a.relativePosition.y === b.relativePosition.y) {
      return a.relativePosition.x - b.relativePosition.x;
      }
      return a.relativePosition.y - b.relativePosition.y;
    });

    const position = newDroppedItems.findIndex(
      (droppedItem) => droppedItem.id === newItem.id
    );
    setDragOverPosition(position);
  };

  const recalculatePositions = () => {
    const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
    setDroppedItems((prev) =>
      prev.map((item) => ({
        ...item,
        position: {
          x: item.relativePosition.x * dropZoneRect.width,
          y: item.relativePosition.y * dropZoneRect.height,
        },
      }))
    );
  };

  useEffect(() => {
    window.addEventListener('resize', recalculatePositions);
    return () => {
      window.removeEventListener('resize', recalculatePositions);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.itemList}>
        <h2 className={styles.columnTitle}>Items</h2>
        {listItems.length === 0 ? (
          <p className={styles.placeholderText}>No Items</p>
        ) : (
          listItems.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              onDragStart={(e) => handleDragStartWrapper(e, item)}
              onDragEnd={handleDragEndWrapper} 
            />
          ))
        )}
      </div>

      <DropZone
        ref={dropZoneRef}
        onDrop={(e) => handleDropItem(e)}
        onDragOver={(e) => handleDragOverDropZone(e)}
        isDragging={isDragging} 
        droppedItems={
          droppedItems.length === 0 ? (
            <p className={styles.placeholderText}>Drop Items Here</p>
          ) : (
            droppedItems.map((item, index) => (
              <DraggableItem
                key={item.id}
                className={index === dragOverPosition ? styles.dragOverPositionIndicator : ''}
                item={item}
                isInDropZone
                onReset={handleResetItem}
              />
            ))
          )
        }
      />
    </div>
  );
};

export default DragAndDrop;