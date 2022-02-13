import { forwardRef, useCallback, useEffect, useRef } from "react";

// eslint-disable-next-line no-undef
type BasicInputProps = JSX.IntrinsicElements["input"];

type InputProps = {
  indeterminate: any;
} & BasicInputProps;

export const IndeterminateCheckbox = forwardRef<HTMLInputElement, InputProps>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    const checkRef = useCallback(
      (refe: any) => {
        if (refe.current) {
          refe.current.indeterminate = indeterminate;
        }
      },
      [indeterminate]
    );

    useEffect(() => {
      checkRef(resolvedRef);
    }, [resolvedRef, checkRef]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

IndeterminateCheckbox.displayName = "Checkbox";
