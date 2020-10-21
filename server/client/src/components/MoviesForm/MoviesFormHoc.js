import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo'
import { styles } from './styles';
import { addMovie,getDirects } from './mutation'

const withGraphqlAdd = graphql(addMovie,{
    props:({mutate})=>({
        addMovie: direcotr=>mutate({
            variables:direcotr
        })
    })
})


export default compose(withStyles(styles),withGraphqlAdd,graphql(getDirects));
