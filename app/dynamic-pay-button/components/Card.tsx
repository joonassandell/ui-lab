import {
  type CardInnerProps,
  type CardProps,
  CARDS,
  useDynamicPayButton,
} from '../';
import { cn } from '@/lib/utils';
import { DelayedRender } from '@/components/DelayedRender';
import {
  type DragHandlers,
  m,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';
import { useState } from 'react';

export const Card = ({
  index,
  onDragEndOffset,
  variant = 'visa',
  ...props
}: CardProps) => {
  const { onCardTouchEnd, onCardTouchStart, overflow, setOverflow } =
    useDynamicPayButton();
  const [flip, setFlip] = useState(false);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.8, 1, 0.8]);
  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10], {
    clamp: false,
  });
  const front = index === 0;

  const handleDragEndOffset: DragHandlers['onDragEnd'] = (e, info) => {
    if (front) {
      if (info.offset.x < -100) {
        onDragEndOffset && onDragEndOffset(e, info);
      }
      if (info.offset.x > 100 || info.offset.y > 50) {
        onDragEndOffset && onDragEndOffset(e, info);
      }
    }
  };

  return (
    <m.div
      animate={{
        scale: 1 - index * 0.06,
        y: index * -16,
        zIndex: CARDS.length - index,
      }}
      className={cn('ul-absolute ul-h-full ul-w-full', {
        'ul-cursor-grab': front,
      })}
      drag={front}
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      initial={false}
      onDragEnd={handleDragEndOffset}
      onDragStart={() => !overflow && setOverflow(true)}
      onTouchEnd={e => onCardTouchEnd && onCardTouchEnd(e)}
      onTouchStart={e => onCardTouchStart && onCardTouchStart(e)}
      style={{
        perspective: 1000,
        rotate,
        x,
      }}
      tabIndex={-1}
      transition={TRANS_SPRING}
      whileTap={{ cursor: front ? 'grabbing' : '' }}
      {...props}
    >
      <m.div
        animate="animate"
        className={cn(
          'ul-h-full ul-w-full ul-select-none ul-rounded-xl ul-text-white ul-text-shadow ul-text-shadow-black/60',
          'dark:ul-shadow-[0_-1px_2px_0_hsla(0,0%,0%,0.3),0_2px_4px_0_hsla(0,0%,0%,0.5)]',
        )}
        custom={flip}
        initial={false}
        onTap={e => {
          const target = e.target as HTMLElement;
          if (target.nodeName === 'INPUT') return;
          front && setFlip(!flip);
        }}
        style={{ scale, transformStyle: 'preserve-3d' }}
        tabIndex={front ? 0 : -1}
        transition={TRANS_SPRING_SLOW}
        variants={{ animate: flip => ({ rotateY: flip ? -180 : [180, 0] }) }}
      >
        {variant === 'visa' && <CardVisa front={front} />}
        {variant === 'mastercard' && <CardMaster front={front} />}
      </m.div>
    </m.div>
  );
};

const CardVisa = ({ front }: CardInnerProps) => {
  const { ccv, setCcv } = useDynamicPayButton();

  return (
    <>
      <div
        className={cn(
          'ul-relative ul-flex ul-h-full ul-flex-col ul-justify-end ul-gap-3 ul-overflow-hidden ul-rounded-xl ul-p-5 ul-font-cc',
          'ul-bg-gradient-to-br ul-from-[hsl(210,100%,50%)] ul-to-[hsl(210,100%,30%)]',
          'dark:ul-from-[hsl(210,70%,20%)] dark:ul-to-[hsl(210,70%,10%)]',
          'before:ul-pointer-events-none before:ul-absolute before:ul-inset-0 before:ul-z-10 before:ul-rounded-xl',
          'before:ul-shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:ul-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'ul-absolute -ul-right-24 -ul-top-5 ul-bottom-0 ul-w-full ul-rounded-tl-[100%]',
            'ul-bg-gradient-to-tl ul-from-[hsl(210,100%,27%)] ul-to-[hsl(210,100%,53%)]',
            'dark:ul-from-[hsl(210,70%,7%)] dark:ul-to-[hsl(210,70%,24%)]',
            'before:ul-absolute before:-ul-right-20 before:ul-h-full before:ul-w-full before:ul-rounded-tl-[100%] before:ul-bg-gradient-to-tl',
            'after:ul-absolute after:-ul-right-36 after:ul-h-full after:ul-w-full after:ul-rounded-tl-[100%] after:ul-bg-gradient-to-tl',
          )}
        />
        <svg
          className={cn('ul-absolute ul-right-5 ul-top-6 ul-h-auto ul-w-16')}
          height="24"
          viewBox="0 0 72 24"
          width="72"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
        <svg
          className={cn(
            'ul-absolute ul-right-5 ul-top-0.5 ul-mt-16 ul-h-auto ul-w-6 sm:ul-top-2',
          )}
          height="56"
          viewBox="0 0 46 56"
          width="46"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
  0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>
        <div
          className={cn(
            'ul-relative ul-mb-3 ul-grid ul-h-10 ul-w-12 ul-place-content-center ul-rounded',
            'ul-bg-gradient-to-bl ul-from-[#ffecc7] ul-to-[#d0b978]',
          )}
        >
          <div
            className={cn(
              'ul-absolute ul-top-[0.8rem] ul-h-px ul-w-full ul-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'ul-absolute ul-top-[1.21rem] ul-h-px ul-w-full ul-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'ul-absolute ul-top-[1.6rem] ul-h-px ul-w-full ul-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'ul-absolute ul-left-1/2 ul-h-full ul-w-px ul-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'ul-z-10 ul-h-6 ul-w-5 ul-rounded ul-border ul-border-[#333]',
              'ul-bg-gradient-to-bl ul-from-[#efdbab] ul-to-[#e1cb94]',
            )}
          />
        </div>
        <div
          className={cn(
            'ul-z-10 ul-flex ul-justify-between ul-gap-5 ul-text-base sm:ul-text-xl',
          )}
        >
          <div>1234</div>
          <div>5678</div>
          <div>9000</div>
          <div>1234</div>
        </div>
        <div
          className={cn(
            'ul-z-10 ul-flex ul-justify-between ul-text-xs ul-uppercase sm:ul-text-sm',
          )}
        >
          <div>Mr Joonas Sandell</div>
          <div>12/28</div>
        </div>
      </div>
      <DelayedRender delay={800}>
        <div
          className={cn(
            'ul-absolute ul-top-0 ul-z-20 ul-flex ul-h-full ul-w-full ul-flex-col ul-justify-between ul-rounded-xl ul-p-5 ul-pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'ul-bg-gradient-to-br ul-from-[hsl(210,100%,50%)] ul-to-[hsl(210,100%,30%)]',
            'dark:ul-from-[hsl(210,70%,20%)] dark:ul-to-[hsl(210,70%,10%)]',
            'before:ul-pointer-events-none before:ul-absolute before:ul-inset-0 before:ul-rounded-xl',
            'before:ul-shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
            'dark:before:ul-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
            'after:ul-absolute after:ul-inset-x-0 after:ul-top-5 after:ul-h-10 after:ul-bg-black',
          )}
        >
          <div
            className={cn(
              'ul-relative ul-top-2 ul-mt-16 ul-h-9 ul-w-full ul-rounded ul-bg-white ul-px-3 ul-py-1 ul-text-right ul-text-black/80',
            )}
          >
            <label
              className={cn(
                '-ul-mt-7 ul-mb-1 ul-block ul-text-2xs ul-uppercase ul-text-white',
              )}
            >
              Ccv
            </label>
            <input
              className={cn(
                'ul-h-9 ul-bg-transparent ul-pt-0.5 ul-text-right ul-font-cc ul-outline-0',
              )}
              maxLength={3}
              onChange={e => setCcv(e.target.value)}
              pattern="\d*"
              placeholder="123"
              tabIndex={-1}
              value={front ? ccv : ''}
            />
          </div>
          <p className={cn('ul-text-xs')}>
            This card is the property of Sandell Bank. Swipe me to switch the
            payment card.
          </p>
        </div>
      </DelayedRender>
    </>
  );
};

const CardMaster = ({ front }: CardInnerProps) => {
  const { ccv, setCcv } = useDynamicPayButton();

  return (
    <>
      <div
        className={cn(
          'ul-relative ul-flex ul-h-full ul-flex-col ul-justify-end ul-gap-3 ul-overflow-hidden ul-rounded-xl ul-p-5 ul-font-cc',
          'ul-bg-gradient-to-br ul-from-[hsl(230,30%,50%)] ul-to-[hsl(230,40%,30%)]',
          'dark:ul-from-[hsl(230,50%,25%)] dark:ul-to-[hsl(230,25%,20%)]',
          'before:ul-pointer-events-none before:ul-absolute before:ul-inset-0 before:ul-z-10 before:ul-rounded-xl',
          'before:ul-shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:ul-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'ul-absolute -ul-right-24 -ul-top-5 ul-bottom-0 ul-w-full ul-rounded-tl-[100%]',
            'ul-bg-gradient-to-tl ul-from-[hsl(230,30%,25%)] ul-to-[hsl(230,40%,55%)]',
            'dark:ul-from-[hsl(230,25%,10%)] dark:ul-to-[hsl(230,50%,33%)]',
            'before:ul-absolute before:-ul-right-20 before:ul-h-full before:ul-w-full before:ul-rounded-tl-[100%] before:ul-bg-gradient-to-tl',
            'after:ul-absolute after:-ul-right-36 after:ul-h-full after:ul-w-full after:ul-rounded-tl-[100%] after:ul-bg-gradient-to-tl',
          )}
        />
        <div className={cn('ul-absolute ul-left-5 ul-top-5 ul-flex')}>
          <div className={cn('ul-size-5 ul-rounded-full ul-bg-red-600')} />
          <div
            className={cn(
              '-ul-ml-2 ul-size-5 ul-rounded-full ul-bg-yellow-400/60',
            )}
          />
        </div>
        <svg
          className={cn('ul-absolute ul-right-5 ul-top-6 ul-h-auto ul-w-7')}
          height="32"
          viewBox="0 0 17.5 16.2"
          width="32"
        >
          <path
            d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
            fill="currentColor"
          />
        </svg>
        <div className={cn('ul-mb-1 ul-flex ul-items-center ul-gap-4')}>
          <div
            className={cn(
              'ul-relative ul-grid ul-h-10 ul-w-12 ul-place-content-center ul-rounded',
              'ul-bg-gradient-to-bl ul-from-[#ffecc7] ul-to-[#d0b978]',
            )}
          >
            <div
              className={cn(
                'ul-absolute ul-top-[0.8rem] ul-h-px ul-w-full ul-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'ul-absolute ul-top-[1.21rem] ul-h-px ul-w-full ul-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'ul-absolute ul-top-[1.6rem] ul-h-px ul-w-full ul-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'ul-absolute ul-left-1/2 ul-h-full ul-w-px ul-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'ul-z-10 ul-h-6 ul-w-5 ul-rounded ul-border ul-border-[#333]',
                'ul-bg-gradient-to-bl ul-from-[#efdbab] ul-to-[#e1cb94]',
              )}
            />
          </div>
          <svg
            className={cn('ul-h-auto ul-w-6')}
            height="56"
            viewBox="0 0 46 56"
            width="46"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
  0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
        </div>
        <div
          className={cn(
            'ul-z-10 ul-flex ul-justify-between ul-gap-5 ul-text-base sm:ul-text-xl',
          )}
        >
          <div>1234</div>
          <div>5678</div>
          <div>9101</div>
          <div>1123</div>
        </div>
        <div
          className={cn(
            'ul-z-10 ul-flex ul-justify-between ul-text-xs ul-uppercase sm:ul-text-sm',
          )}
        >
          <div>Mr Joonas Sandell</div>
          <div>10/27</div>
        </div>
      </div>
      <DelayedRender delay={800}>
        <div
          className={cn(
            'ul-absolute ul-top-0 ul-z-20 ul-flex ul-h-full ul-w-full ul-flex-col ul-justify-between ul-rounded-xl ul-p-5 ul-pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'ul-bg-gradient-to-br ul-from-[hsl(230,30%,50%)] ul-to-[hsl(230,40%,30%)]',
            'dark:ul-from-[hsl(0,0%,20%)] dark:ul-to-[hsl(0,0%,10%)]',
            'before:ul-pointer-events-none before:ul-absolute before:ul-inset-0 before:ul-rounded-xl',
            'before:ul-shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
            'dark:before:ul-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
            'after:ul-absolute after:ul-inset-x-0 after:ul-top-5 after:ul-h-10 after:ul-bg-black',
          )}
        >
          <div
            className={cn(
              'ul-relative ul-top-2 ul-mt-16 ul-h-9 ul-w-full ul-rounded ul-bg-white ul-px-3 ul-py-1 ul-text-right ul-text-black/80',
            )}
          >
            <label
              className={cn(
                '-ul-mt-7 ul-mb-1 ul-block ul-text-2xs ul-uppercase ul-text-white',
              )}
            >
              ccv
            </label>
            <input
              className={cn(
                'ul-h-9 ul-bg-transparent ul-pt-px ul-text-right ul-font-cc ul-outline-0',
              )}
              maxLength={3}
              onChange={e => setCcv(e.target.value)}
              pattern="\d*"
              placeholder="123"
              tabIndex={-1}
              value={front ? ccv : ''}
            />
          </div>

          <p className={cn('ul-text-xs')}>
            Swipe me to switch the active payment card. Fancy details like this?{' '}
            <a
              className={cn('ul-underline')}
              href="https://joonassandell.com/contact"
              tabIndex={-1}
            >
              Hire me
            </a>
            !
          </p>
        </div>
      </DelayedRender>
    </>
  );
};
