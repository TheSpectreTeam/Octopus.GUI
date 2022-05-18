import {compose} from '../../utils/functions/compose'
import { withChakra } from './withChakra'
import { withRouter } from './withRouter'

export const withProviders=compose(withChakra,withRouter)