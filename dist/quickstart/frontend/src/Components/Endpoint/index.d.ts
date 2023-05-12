import { DataItem, Categories } from "../../dataUtilities";
interface Props {
    endpoint: string;
    name?: string;
    categories: Array<Categories>;
    schema: string;
    description: string;
    transformData: (arg: any) => Array<DataItem>;
}
declare const Endpoint: {
    (props: Props): any;
    displayName: string;
};
export default Endpoint;
