import { mergeClasses } from '@griffel/react';

import { useClasses } from './Container.classes';

function Container({ children, className, as: Tag = 'div', ...props }) {
  const classes = useClasses();
  return (
    <Tag className={mergeClasses(classes.container, className)} {...props}>
      {children}
    </Tag>
  );
}

export default Container;
