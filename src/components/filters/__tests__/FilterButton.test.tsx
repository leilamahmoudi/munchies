import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterButton } from '../FilterButton';

describe('FilterButton', () => {
  it('renders the label', () => {
    render(<FilterButton label="0-10 min" isActive={false} onToggle={() => {}} />);
    expect(screen.getByText('0-10 min')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn();
    render(<FilterButton label="0-10 min" isActive={false} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('has dark background when active', () => {
    render(<FilterButton label="0-10 min" isActive={true} onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-900');
  });

  it('has white background when inactive', () => {
    render(<FilterButton label="0-10 min" isActive={false} onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('bg-white');
  });
});
