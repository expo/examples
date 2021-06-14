import { ConfigPlugin } from "@expo/config-plugins";
declare const _default: ConfigPlugin<void | {
    /**
     * Disable adding proguard minification to the `app/build.gradle`.
     *
     * @default false
     */
    skipProguard?: boolean | undefined;
    /**
     * Subdomains to add to the network security config.
     * Pass `['10.0.3.2', 'localhost']` to use Genymotion emulators instead of Google emulators.
     *
     * @default ['10.0.2.2', 'localhost'] // (Google emulators)
     */
    subdomains?: string[] | undefined;
}>;
export default _default;
