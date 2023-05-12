import { DataItem, Categories } from "../../dataUtilities";
interface Props {
    data: Array<DataItem>;
    categories: Array<Categories>;
}
declare const Identity: {
    (props: Props): any;
    displayName: string;
};
export default Identity;
