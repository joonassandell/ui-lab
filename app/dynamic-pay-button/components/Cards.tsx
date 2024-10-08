import { Card } from './Card';
import { CARDS, useDynamicPayButton } from '../';
import { cn, move } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const Cards = () => {
  const [cards, setCards] = useState(CARDS);
  const { loading, setCcv, setSwitchCard, switchCard } = useDynamicPayButton();

  const resetCards = () => {
    setCards(move(cards, 0, cards.length));
    setCcv('');
  };

  useEffect(() => {
    if (!switchCard) return;
    resetCards();
    setSwitchCard(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchCard, setSwitchCard]);

  return (
    <div
      className={cn('u-relative u-mt-1 u-h-48 xs:u-h-52')}
      inert={loading ? '' : undefined}
    >
      {cards.map(({ id, variant }, index) => {
        return (
          <Card
            index={index}
            key={id}
            onDragEndOffset={() => resetCards()}
            variant={variant}
          />
        );
      })}
    </div>
  );
};
