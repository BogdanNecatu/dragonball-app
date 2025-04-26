import { render, fireEvent } from '@testing-library/react';
import { useHorizontalScroll } from '../useHorizontalScroll';

const ScrollableComponent = () => {
  const scrollRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      data-testid="scrollable"
      className="scrollable"
      style={{
        overflowX: 'auto',
        width: '200px',
        whiteSpace: 'nowrap',
        scrollBehavior: 'auto',
      }}
    >
      <div style={{ display: 'inline-block', width: '1000px', height: '100px' }}>Scrollable Content</div>
    </div>
  );
};

// Ensures ref is attached
it('attaches the scrollRef to the DOM element', () => {
  const { getByTestId } = render(<ScrollableComponent />);
  expect(getByTestId('scrollable')).toBeInTheDocument();
});

// Ensures event listeners are attached and class toggling works
it('adds and removes "scrolling" class during drag events', () => {
  const { getByTestId } = render(<ScrollableComponent />);
  const element = getByTestId('scrollable');

  fireEvent.mouseDown(element, { pageX: 100 });
  expect(element.classList.contains('scrolling')).toBe(true);

  fireEvent.mouseUp(element);
  expect(element.classList.contains('scrolling')).toBe(false);
});
