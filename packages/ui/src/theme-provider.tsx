import { ThemeProvider as InternalThemeProvider, useTheme } from 'next-themes';
import { Toaster } from '#/components/sonner';

export { useTheme };

export function ThemeProvider(props: React.PropsWithChildren) {
  return (
    <InternalThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={['light', 'dark']}
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {props.children}
    </InternalThemeProvider>
  );
}
