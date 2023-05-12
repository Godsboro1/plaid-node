import { ErrorDataItem } from "../../dataUtilities";
interface Props {
    error: ErrorDataItem;
}
declare const Error: {
    (props: Props): any;
    displayName: string;
};
export default Error;
