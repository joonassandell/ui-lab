/* =======================================
 * Animations
 * =======================================
 *
 * @link https://www.framer.com/motion/easing-functions
 */

export const TRANS_SPRING = {
  damping: 20,
  stiffness: 200,
  type: 'spring',
};

export const TRANS_SPRING_FAST = {
  damping: 30,
  stiffness: 450,
  type: 'spring',
};

export const TRANS_SPRING_SLOW = {
  damping: 15,
  stiffness: 100,
  type: 'spring',
};

/* =======================================
 * Environment variables
 * ======================================= */

export const ALLOWED_IFRAME_URLS = process.env.NEXT_PUBLIC_ALLOWED_IFRAME_URLS;
