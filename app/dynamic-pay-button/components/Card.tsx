import {
  type CardInnerProps,
  type CardProps,
  CARDS,
  useDynamicPayButton,
} from '../';
import { cn, rem } from '@/lib/utils';
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
        y: rem(index * -1),
        zIndex: CARDS.length - index,
      }}
      className={cn('u-absolute u-h-full u-w-full', {
        'u-cursor-grab': front,
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
          'u-h-full u-w-full u-rounded-xl u-text-white u-text-shadow u-text-shadow-black/60',
          'dark:u-shadow-[0_-1px_2px_0_hsla(0,0%,0%,0.3),0_2px_4px_0_hsla(0,0%,0%,0.3)]',
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
          'u-relative u-flex u-h-full u-flex-col u-justify-end u-gap-3 u-overflow-hidden u-rounded-xl u-p-5 u-font-cc',
          'u-bg-gradient-to-br u-from-[hsl(210,100%,50%)] u-to-[hsl(210,100%,30%)]',
          'dark:u-from-[hsl(210,70%,20%)] dark:u-to-[hsl(210,70%,10%)]',
          'before:u-pointer-events-none before:u-absolute before:u-inset-0 before:u-z-10 before:u-rounded-xl',
          'before:u-shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:u-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'u-absolute -u-right-24 -u-top-5 u-bottom-0 u-w-full u-rounded-tl-[100%]',
            'u-bg-gradient-to-tl u-from-[hsl(210,100%,27%)] u-to-[hsl(210,100%,53%)]',
            'dark:u-from-[hsl(210,70%,7%)] dark:u-to-[hsl(210,70%,24%)]',
            'before:u-absolute before:-u-right-20 before:u-h-full before:u-w-full before:u-rounded-tl-[100%] before:u-bg-gradient-to-tl',
            'after:u-absolute after:-u-right-36 after:u-h-full after:u-w-full after:u-rounded-tl-[100%] after:u-bg-gradient-to-tl',
          )}
        />
        <svg
          className={cn('u-absolute u-right-5 u-top-6 u-h-auto u-w-16')}
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
            'u-absolute u-right-5 u-top-0.5 u-mt-16 u-h-auto u-w-6 xs:u-top-2',
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
            'u-relative u-mb-3 u-grid u-h-10 u-w-12 u-place-content-center u-rounded',
            'u-bg-gradient-to-bl u-from-[#ffecc7] u-to-[#d0b978]',
          )}
        >
          <div
            className={cn(
              'u-absolute u-top-[0.8rem] u-h-px u-w-full u-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'u-absolute u-top-[1.21rem] u-h-px u-w-full u-bg-[#333]',
            )}
          />
          <div
            className={cn(
              'u-absolute u-top-[1.6rem] u-h-px u-w-full u-bg-[#333]',
            )}
          />
          <div
            className={cn('u-absolute u-left-1/2 u-h-full u-w-px u-bg-[#333]')}
          />
          <div
            className={cn(
              'u-z-10 u-h-6 u-w-5 u-rounded u-border u-border-[#333]',
              'u-bg-gradient-to-bl u-from-[#efdbab] u-to-[#e1cb94]',
            )}
          />
        </div>
        <div
          className={cn(
            'u-z-10 u-flex u-justify-between u-gap-5 u-text-base xs:u-text-xl',
          )}
        >
          <div>1234</div>
          <div>5678</div>
          <div>9000</div>
          <div>1234</div>
        </div>
        <div
          className={cn(
            'u-z-10 u-flex u-justify-between u-text-xs u-uppercase xs:u-text-sm',
          )}
        >
          <div>Mr Joonas Sandell</div>
          <div>12/28</div>
        </div>
      </div>
      <DelayedRender delay={800}>
        <div
          className={cn(
            'u-absolute u-top-0 u-z-20 u-flex u-h-full u-w-full u-flex-col u-justify-between u-rounded-xl u-p-5 u-pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'u-bg-gradient-to-br u-from-[hsl(210,100%,50%)] u-to-[hsl(210,100%,30%)]',
            'dark:u-from-[hsl(210,70%,20%)] dark:u-to-[hsl(210,70%,10%)]',
            'before:u-pointer-events-none before:u-absolute before:u-inset-0 before:u-rounded-xl',
            'before:u-shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
            'dark:before:u-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
            'after:u-absolute after:u-inset-x-0 after:u-top-5 after:u-h-10 after:u-bg-black',
          )}
        >
          <div
            className={cn(
              'u-relative u-top-2 u-mt-16 u-h-9 u-w-full u-rounded u-bg-white u-px-3 u-py-1 u-text-right u-text-black/80',
            )}
          >
            <label
              className={cn(
                '-u-mt-7 u-mb-1 u-block u-text-2xs u-uppercase u-text-white',
              )}
            >
              Ccv
            </label>
            <input
              className={cn(
                'u-h-9 u-bg-transparent u-pt-0.5 u-text-right u-font-cc u-outline-none',
              )}
              maxLength={3}
              onChange={e => setCcv(e.target.value)}
              pattern="\d*"
              placeholder="123"
              tabIndex={-1}
              value={front ? ccv : ''}
            />
          </div>
          <p className={cn('u-text-xs')}>
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
          'u-relative u-flex u-h-full u-flex-col u-justify-end u-gap-3 u-overflow-hidden u-rounded-xl u-p-5 u-font-cc',
          'u-bg-gradient-to-br u-from-[hsl(230,30%,50%)] u-to-[hsl(230,40%,30%)]',
          'dark:u-from-[hsl(230,50%,25%)] dark:u-to-[hsl(230,25%,20%)]',
          'before:u-pointer-events-none before:u-absolute before:u-inset-0 before:u-z-10 before:u-rounded-xl',
          'before:u-shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:u-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'u-absolute -u-right-24 -u-top-5 u-bottom-0 u-w-full u-rounded-tl-[100%]',
            'u-bg-gradient-to-tl u-from-[hsl(230,30%,25%)] u-to-[hsl(230,40%,55%)]',
            'dark:u-from-[hsl(230,25%,10%)] dark:u-to-[hsl(230,50%,33%)]',
            'before:u-absolute before:-u-right-20 before:u-h-full before:u-w-full before:u-rounded-tl-[100%] before:u-bg-gradient-to-tl',
            'after:u-absolute after:-u-right-36 after:u-h-full after:u-w-full after:u-rounded-tl-[100%] after:u-bg-gradient-to-tl',
          )}
        />
        <div className={cn('u-absolute u-left-5 u-top-5 u-flex')}>
          <div className={cn('u-size-5 u-rounded-full u-bg-red-600')} />
          <div
            className={cn('-u-ml-2 u-size-5 u-rounded-full u-bg-yellow-400/60')}
          />
        </div>
        <svg
          className={cn('u-absolute u-right-5 u-top-6 u-h-auto u-w-7')}
          height="32"
          viewBox="0 0 17.5 16.2"
          width="32"
        >
          <path
            d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
            fill="currentColor"
          />
        </svg>
        <div className={cn('u-mb-1 u-flex u-items-center u-gap-4')}>
          <div
            className={cn(
              'u-relative u-grid u-h-10 u-w-12 u-place-content-center u-rounded',
              'u-bg-gradient-to-bl u-from-[#ffecc7] u-to-[#d0b978]',
            )}
          >
            <div
              className={cn(
                'u-absolute u-top-[0.8rem] u-h-px u-w-full u-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'u-absolute u-top-[1.21rem] u-h-px u-w-full u-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'u-absolute u-top-[1.6rem] u-h-px u-w-full u-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'u-absolute u-left-1/2 u-h-full u-w-px u-bg-[#333]',
              )}
            />
            <div
              className={cn(
                'u-z-10 u-h-6 u-w-5 u-rounded u-border u-border-[#333]',
                'u-bg-gradient-to-bl u-from-[#efdbab] u-to-[#e1cb94]',
              )}
            />
          </div>
          <svg
            className={cn('u-h-auto u-w-6')}
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
            'u-z-10 u-flex u-justify-between u-gap-5 u-text-base xs:u-text-xl',
          )}
        >
          <div>1234</div>
          <div>5678</div>
          <div>9101</div>
          <div>1123</div>
        </div>
        <div
          className={cn(
            'u-z-10 u-flex u-justify-between u-text-xs u-uppercase xs:u-text-sm',
          )}
        >
          <div>Mr Joonas Sandell</div>
          <div>10/27</div>
        </div>
      </div>
      <DelayedRender delay={800}>
        <div
          className={cn(
            'u-absolute u-top-0 u-z-20 u-flex u-h-full u-w-full u-flex-col u-justify-between u-rounded-xl u-p-5 u-pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            'u-bg-gradient-to-br u-from-[hsl(230,30%,50%)] u-to-[hsl(230,40%,30%)]',
            'dark:u-from-[hsl(0,0%,20%)] dark:u-to-[hsl(0,0%,10%)]',
            'before:u-pointer-events-none before:u-absolute before:u-inset-0 before:u-rounded-xl',
            'before:u-shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
            'dark:before:u-shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
            'after:u-absolute after:u-inset-x-0 after:u-top-5 after:u-h-10 after:u-bg-black',
          )}
        >
          <div
            className={cn(
              'u-relative u-top-2 u-mt-16 u-h-9 u-w-full u-rounded u-bg-white u-px-3 u-py-1 u-text-right u-text-black/80',
            )}
          >
            <label
              className={cn(
                '-u-mt-7 u-mb-1 u-block u-text-2xs u-uppercase u-text-white',
              )}
            >
              ccv
            </label>
            <input
              className={cn(
                'u-h-9 u-bg-transparent u-pt-px u-text-right u-font-cc u-outline-none',
              )}
              maxLength={3}
              onChange={e => setCcv(e.target.value)}
              pattern="\d*"
              placeholder="123"
              tabIndex={-1}
              value={front ? ccv : ''}
            />
          </div>

          <p className={cn('u-text-xs')}>
            Swipe me to switch the active payment card. Fancy details like this?{' '}
            <a
              className={cn('u-underline')}
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
