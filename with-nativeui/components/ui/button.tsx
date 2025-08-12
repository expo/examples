import * as React from "react";
import {
  Pressable,
  PressableProps as RNPressableProps,
  View,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow",
        destructive:
          "bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground shadow-sm",
        outline:
          "border border-input bg-background text-foreground dark:border-input dark:bg-background dark:text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-sm",
        ghost: "text-foreground dark:text-foreground",
        link: "text-primary dark:text-primary underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<RNPressableProps, "style">,
  VariantProps<typeof buttonVariants> {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(state: PressableStateCallbackType) => (
          <View
            className={`flex-row items-center justify-center gap-2 ${state.pressed ? "opacity-80" : ""
              }`}
          >
            {typeof children === "function" ? children(state) : children}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button };
