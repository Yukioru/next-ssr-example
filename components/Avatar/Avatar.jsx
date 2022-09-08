import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useClasses } from './Avatar.classes';

function Avatar({ src, alt, size = 30, scrollPosition, style, ...props }) {
  const classes = useClasses();
  return (
    <LazyLoadImage
      className={classes.avatar}
      effect="opacity"
      width={size}
      height={size}
      src={src}
      alt={alt}
      style={style}
      scrollPosition={scrollPosition}
      placeholderSrc="/images/no-avatar.png"
      {...props}
    />
  );
}

export default Avatar;
