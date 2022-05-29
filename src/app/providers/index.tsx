import { compose } from "../../utils/functions/compose";
import { withChakra } from "./withChakra";
import { withReactQuery } from "./withReactQuery";
import { withRouter } from "./withRouter";

export const withProviders = compose( withReactQuery,withChakra, withRouter);
