import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DraggableItem from '../utils/DraggableItem';

// Testing component with Jest and React Testing Library
test('DraggableItem should trigger onDragStart when dragging begins', () => {
  const mockDragStart = jest.fn();
  const item = { id: 1, content: 'Test Item' };
  
  const { getByText } = render(
    <DraggableItem item={item} onDragStart={mockDragStart} />
  );

  const draggableElement = getByText('Test Item');
  fireEvent.dragStart(draggableElement);
  
  expect(mockDragStart).toHaveBeenCalledTimes(1);
  expect(mockDragStart).toHaveBeenCalledWith(expect.anything(), item);
});
