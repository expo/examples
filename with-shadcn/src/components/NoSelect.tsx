export function StyleNoSelect() {
  if (
    // @ts-expect-error: Added via react-native-webview
    typeof ReactNativeWebView === "undefined"
  )
    return null;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
       body {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        body * {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
      `,
      }}
    />
  );
}
