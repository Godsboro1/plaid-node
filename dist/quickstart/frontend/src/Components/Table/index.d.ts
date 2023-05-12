import { DataItem, Categories } from "../../dataUtilities";
interface Props {
    data: Array<DataItem>;
    categories: Array<Categories>;
    isIdentity: boolean;
}
declare const Table: {
    (props: Props): any;
    displayName: string;
};
export default Table;
