import { useCurrency } from '@/contexts/CurrencyContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
}

export const PriceRangeFilter = ({ 
  priceRange, 
  onPriceRangeChange,
  onReset
}: PriceRangeFilterProps) => {
  const { currency, formatSinglePrice } = useCurrency();

  // Currency-specific ranges
  const ranges = {
    NGN: { min: 10000, max: 85000, step: 5000 },
    USD: { min: 14, max: 99, step: 5 }
  };

  const currentRange = ranges[currency];

  const handleValueChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]]);
  };

  const isFiltered = priceRange[0] !== currentRange.min || priceRange[1] !== currentRange.max;

  return (
    <div className="w-full bg-card rounded-lg p-4 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Price Range</h3>
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={handleValueChange}
          min={currentRange.min}
          max={currentRange.max}
          step={currentRange.step}
          className="w-full"
        />

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            {formatSinglePrice(priceRange[0], currency)}
          </span>
          <span className="text-muted-foreground">-</span>
          <span className="font-medium text-muted-foreground">
            {formatSinglePrice(priceRange[1], currency)}
          </span>
        </div>
      </div>
    </div>
  );
};
