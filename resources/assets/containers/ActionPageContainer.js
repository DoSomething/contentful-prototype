import { connect } from 'react-redux';
import ActionPage from '../components/ActionPage';
import { clickedSignUp } from '../actions';
import { lipsum } from '../helpers';

// @TODO Pull in real content from Contentful.
let steps = [
  {
    title: 'Step 1: Know It',
    content: `Lorem ipsum labore tempora aut possimus possimus animi eaque voluptatem iste dicta placeat
    aperiam porro dolor beatae dignissimos animi voluptatem illum ut sint labore voluptatibus blanditiis 
    doloribus fugit temporibus delectus nemo qui molestiae dolor rem architecto veritatis explicabo qui 
    sequi et ipsam et rerum quis cupiditate occaecati vel debitis accusantium error in aut quia ut 
    laborum non explicabo aspernatur vel omnis et`,
  },
  {
    title: 'Step 2: Plan It',
    content: `Lorem ipsum iste dicta expedita sit et accusamus sunt omnis assumenda molestias et et voluptas
    quidem molestiae dolor aut distinctio quod nemo minima distinctio ut et doloremque distinctio iste rem
    accusamus et vel sint quia aut omnis magnam delectus et recusandae occaecati tempore ut mollitia est
    aut eligendi culpa dolores ut in quibusdam quia tenetur eaque sit optio.`,
  },
  {
    title: 'Step 3: Do It',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget augue tristique, condimentum
    neque non, iaculis diam. Cras varius enim at ex egestas dignissim. Nullam consequat massa eu lobortis
    faucibus. Fusce eu ullamcorper magna, ac porttitor libero. Nunc vitae fringilla est. Vivamus erat risus,
    aliquam sed gravida vitae, hendrerit et orci. Vivamus libero ligula, imperdiet eu lacus ac, blandit aliquam
    est. Sed ultricies id velit vel vehicula. Curabitur ac turpis lobortis, imperdiet mauris non, tristique
    libero. Fusce molestie turpis nisl, sit amet posuere magna placerat nec.`,
  },
];

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    steps: steps,
    callToAction: state.campaign.callToAction,
    signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
    hasPendingSignup: state.signups.isPending,
    isAuthenticated: state.user.id !== null,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ActionPage);
