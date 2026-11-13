export type BrandIconProps = {
  className?: string;
  /** Accessible name. Omit when the icon sits next to visible text (it is then hidden from assistive tech). */
  title?: string;
  /** Unique per instance when the same icon appears more than once (keeps gradient IDs unique). */
  idPrefix?: string;
};
