import {
  type CardInnerProps,
  type CardProps,
  CARDS,
  useDynamicPayButton,
} from '../';
import { cn } from '@/lib/utils';
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
  onDragEnd,
  variant = 'visa',
  ...props
}: CardProps) => {
  const { overflow, setOverflow } = useDynamicPayButton();
  const [flip, setFlip] = useState(false);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.8, 1, 0.8]);
  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10], {
    clamp: false,
  });
  const front = index === 0;

  const handleDragEnd: DragHandlers['onDragEnd'] = (e, info) => {
    if (front) {
      if (info.offset.x < -100) {
        onDragEnd && onDragEnd(e, info);
      }
      if (info.offset.x > 100 || info.offset.y > 50) {
        onDragEnd && onDragEnd(e, info);
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
      className={cn('absolute h-full w-full', { 'cursor-grab': front })}
      drag={front}
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      onDragEnd={handleDragEnd}
      onDragStart={() => !overflow && setOverflow(true)}
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
          'h-full w-full select-none rounded-xl text-white text-shadow text-shadow-black/60',
          'dark:shadow-[0_-1px_2px_0_hsla(0,0%,0%,0.3),0_2px_4px_0_hsla(0,0%,0%,0.5)]',
        )}
        custom={flip}
        initial={false}
        onTap={() => front && setFlip(!flip)}
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
          'relative flex h-full flex-col justify-end gap-3 overflow-hidden rounded-xl p-5 font-cc',
          'bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,30%)]',
          'dark:from-[hsl(210,70%,20%)] dark:to-[hsl(210,70%,10%)]',
          'before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-xl',
          'before:shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'absolute -right-24 -top-5 bottom-0 w-full rounded-tl-[100%]',
            'bg-gradient-to-tl from-[hsl(210,100%,27%)] to-[hsl(210,100%,53%)]',
            'dark:from-[hsl(210,70%,7%)] dark:to-[hsl(210,70%,24%)]',
            'before:absolute before:-right-20 before:h-full before:w-full before:rounded-tl-[100%] before:bg-gradient-to-tl',
            'after:absolute after:-right-36 after:h-full after:w-full after:rounded-tl-[100%] after:bg-gradient-to-tl',
          )}
        />
        <svg
          className={cn('absolute right-5 top-6')}
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
          className={cn('absolute right-5 top-1 mt-14 origin-right scale-50')}
          height="56"
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
            'relative mb-3 grid h-10 w-12 place-content-center rounded',
            'bg-gradient-to-bl from-[#ffecc7] to-[#d0b978]',
          )}
        >
          <div className={cn('absolute top-[0.8rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute top-[1.21rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute top-[1.6rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute left-1/2 h-full w-px bg-[#333]')} />
          <div
            className={cn(
              'z-[1] h-6 w-5 rounded border border-[#333]',
              'bg-gradient-to-bl from-[#efdbab] to-[#e1cb94]',
            )}
          />
        </div>
        <div className={cn('z-[1] flex justify-between gap-5 text-xl')}>
          <div>1234</div>
          <div>5678</div>
          <div>9000</div>
          <div>1234</div>
        </div>
        <div className={cn('z-[1] flex justify-between text-sm uppercase')}>
          <div>Mr Joonas Sandell</div>
          <div>12/28</div>
        </div>
      </div>
      <div
        className={cn(
          'absolute top-0 z-[2] flex h-full w-full flex-col justify-between rounded-xl p-5 pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
          'bg-gradient-to-br from-[hsl(210,100%,50%)] to-[hsl(210,100%,30%)]',
          'dark:from-[hsl(210,70%,20%)] dark:to-[hsl(210,70%,10%)]',
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-xl',
          'before:shadow-[0_1px_0_0_hsla(0,0%,0%,0.3)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
          'after:absolute after:left-0 after:right-0 after:top-5 after:h-10 after:bg-black',
        )}
      >
        <div
          className={cn(
            'relative top-2 mt-16 h-9 w-full rounded bg-white px-3 py-1 text-right text-black/80',
          )}
        >
          <label
            className={cn('-mt-7 mb-1 block text-2xs uppercase text-white')}
          >
            ccv
          </label>
          <input
            className={cn(
              'h-9 bg-transparent pt-px text-right font-cc outline-0',
            )}
            maxLength={3}
            onChange={e => setCcv(e.target.value)}
            pattern="\d*"
            placeholder="123"
            tabIndex={-1}
            value={front ? ccv : ''}
          />
        </div>
        <div className={cn('text-xs')}>
          <p>
            This card is property of Sandell Bank. You can also swipe me to
            switch the active payment card.
          </p>
        </div>
      </div>
    </>
  );
};

const CardMaster = ({ front }: CardInnerProps) => {
  const { ccv, setCcv } = useDynamicPayButton();
  return (
    <>
      <div
        className={cn(
          'relative flex h-full flex-col justify-end gap-3 overflow-hidden rounded-xl p-5 font-cc',
          'bg-gradient-to-br from-[hsl(230,30%,50%)] to-[hsl(230,40%,30%)]',
          'dark:from-[hsl(230,50%,25%)] dark:to-[hsl(230,25%,20%)]',
          'before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-xl',
          'before:shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
        )}
      >
        <div
          className={cn(
            'absolute -right-24 -top-5 bottom-0 w-full rounded-tl-[100%]',
            'bg-gradient-to-tl from-[hsl(230,30%,25%)] to-[hsl(230,40%,55%)]',
            'dark:from-[hsl(230,25%,10%)] dark:to-[hsl(230,50%,33%)]',
            'before:absolute before:-right-20 before:h-full before:w-full before:rounded-tl-[100%] before:bg-gradient-to-tl',
            'after:absolute after:-right-36 after:h-full after:w-full after:rounded-tl-[100%] after:bg-gradient-to-tl',
          )}
        />
        <div className={cn('absolute left-5 top-5 flex')}>
          <div className={cn('size-5 rounded-full bg-red-600')} />
          <div className={cn('-ml-2 size-5 rounded-full bg-yellow-400/60')} />
        </div>
        <svg
          className={cn('absolute right-5 top-6')}
          height="32"
          viewBox="0 0 17.5 16.2"
          width="32"
        >
          <path
            d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
            fill="currentColor"
          />
        </svg>
        <div className={cn('mb-1 flex items-center gap-2')}>
          <div
            className={cn(
              'relative grid h-10 w-12 place-content-center rounded',
              'bg-gradient-to-bl from-[#ffecc7] to-[#d0b978]',
            )}
          >
            <div
              className={cn('absolute top-[0.8rem] h-px w-full bg-[#333]')}
            />
            <div
              className={cn('absolute top-[1.21rem] h-px w-full bg-[#333]')}
            />
            <div
              className={cn('absolute top-[1.6rem] h-px w-full bg-[#333]')}
            />
            <div className={cn('absolute left-1/2 h-full w-px bg-[#333]')} />
            <div
              className={cn(
                'z-[1] h-6 w-5 rounded border border-[#333]',
                'bg-gradient-to-bl from-[#efdbab] to-[#e1cb94]',
              )}
            />
          </div>
          <svg
            className={cn('origin-center scale-50')}
            height="56"
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
        <div className={cn('z-[1] flex justify-between gap-5 text-xl')}>
          <div>1234</div>
          <div>5678</div>
          <div>9101</div>
          <div>1123</div>
        </div>
        <div className={cn('z-[1] flex justify-between text-sm uppercase')}>
          <div>Mr Joonas Sandell</div>
          <div>10/27</div>
        </div>
      </div>
      <div
        className={cn(
          'absolute top-0 z-[2] flex h-full w-full flex-col justify-between rounded-xl p-5 pb-3 [backface-visibility:hidden] [transform:rotateY(180deg)]',
          'bg-gradient-to-br from-[hsl(230,30%,50%)] to-[hsl(230,40%,30%)]',
          'dark:from-[hsl(0,0%,20%)] dark:to-[hsl(0,0%,10%)]',
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-xl',
          'before:shadow-[0_1px_0_0_hsla(0,0%,0%,0.15)_inset,0_0_0_1px_hsla(0,0%,0%,0.25)_inset,0_2px_0_0_hsla(0,0%,100%,0.05)_inset,0_0_0_2px_hsla(0,0%,100%,0.15)_inset]',
          'dark:before:shadow-[0_1px_0_0_hsla(0,0%,100%,0.06)_inset,0_0_0_1px_hsla(0,0%,100%,0.05)_inset]',
          'after:absolute after:left-0 after:right-0 after:top-5 after:h-10 after:bg-black',
        )}
      >
        <div
          className={cn(
            'relative top-2 mt-16 h-9 w-full rounded bg-white px-3 py-1 text-right text-black/80',
          )}
        >
          <label
            className={cn('-mt-7 mb-1 block text-2xs uppercase text-white')}
          >
            ccv
          </label>
          <input
            className={cn(
              'h-9 bg-transparent pt-px text-right font-cc outline-0',
            )}
            maxLength={3}
            onChange={e => setCcv(e.target.value)}
            pattern="\d*"
            placeholder="123"
            tabIndex={-1}
            value={front ? ccv : ''}
          />
        </div>
        <div className={cn('text-xs')}>
          <p>
            You can also swipe me to switch the active payment card. Fancy
            details like this?{' '}
            <a
              className={cn('underline')}
              href="https://joonassandell.com/contact"
              tabIndex={-1}
              target="_blank"
            >
              Hire me
            </a>
            !
          </p>
        </div>
      </div>
    </>
  );
};
