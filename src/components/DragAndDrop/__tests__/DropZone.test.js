import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropZone from '../utils/DropZone';

test('DropZone should allow drop events and trigger onDrop', () => {
  const mockDrop = jest.fn();
  const { getByText } = render(
    <DropZone onDrop={mockDrop} onDragOver={(e) => e.preventDefault()}>
      Drop here
    </DropZone>
  );

  const dropZoneElement = getByText('Drop here');

  // Simulating drag over
  fireEvent.dragOver(dropZoneElement);
  expect(mockDrop).not.toHaveBeenCalled();

  // Simulating drop event
  fireEvent.drop(dropZoneElement);
  expect(mockDrop).toHaveBeenCalledTimes(1);
});
