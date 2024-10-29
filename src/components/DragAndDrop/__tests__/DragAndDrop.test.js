import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DragAndDrop from '../utils/DragAndDrop';

test('DragAndDrop should move an item to the DropZone on drop', () => {
  const items = [{ id: 1, content: 'Item 1' }];
  const { getByText, queryByText } = render(<DragAndDrop items={items} />);

  const draggableItem = getByText('Item 1');
  const dropZone = getByText('Drop here');

  // Simulating dragging the item
  fireEvent.dragStart(draggableItem);
  fireEvent.dragOver(dropZone);
  fireEvent.drop(dropZone);

  // Checking if the item is now in the DropZone
  expect(queryByText('Item 1')).toBeInTheDocument();
});
