import React, { cloneElement, isValidElement, useState } from 'react';
import {
  offset,
  autoUpdate,
  useFloating,
  useInteractions,
  useDismiss,
  FloatingFocusManager,
  useHover,
  safePolygon,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import { motion, AnimatePresence } from 'framer-motion';

import { useClasses } from './Popover.classes';

const Popover = ({ children, render, placement, offset: propOffset = 8, passPropsToTrigger = false }) => {
  const [open, setOpen] = useState(false);
  const classes = useClasses();

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(propOffset)],
    placement,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useHover(context, {
      handleClose: safePolygon({
        restMs: 50,
      }),
    }),
  ]);

  let _render = render;
  const renderProps = {
    close: () => {
      setOpen(false);
    },
    open,
  };
  if (isValidElement(render)) {
    _render = cloneElement(
      render,
      getReferenceProps({ ...renderProps, ...render.props })
    );
  }
  if (typeof render === 'function') {
    _render = render(renderProps);
  }

  let _trigger = children;
  if (isValidElement(children)) {
    _trigger = cloneElement(
      children,
      getReferenceProps({ ref: reference, ...(passPropsToTrigger ? renderProps : {}), ...children.props })
    );
  }
  if (typeof children === 'function') {
    _trigger = children({ ref: reference, ...renderProps });
  }

  return (
    <>
      {_trigger}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingFocusManager
              context={context}
              modal={false}
              order={['reference', 'content']}
            >
              <motion.div
                className={classes.floating}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                {...getFloatingProps({
                  ref: floating,
                  style: {
                    position: strategy,
                    top: y ?? '',
                    left: x ?? '',
                  },
                })}
              >
                {_render}
              </motion.div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};

export default Popover;
