import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo'
import { styles } from './styles';
import { addDireactor } from './queries';

const withGraphqlAdd = graphql(addDireactor,{
    props:({mutate})=>({
        addDireactor: direcotr=>mutate({
            variables:direcotr
        })
    })
})

export default compose(withStyles(styles),withGraphqlAdd);
