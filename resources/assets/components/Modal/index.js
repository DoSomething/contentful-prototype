export default from './containers/ModalSwitchContainer';

export ModalSwitchContainer from './containers/ModalSwitchContainer';
export ModalControls from './ModalControls';

export Modal from './containers/ModalContainer';
export SurveyModalContainer from './containers/SurveyModalContainer';
export PostShareModalContainer from './containers/PostShareModalContainer';
export PostReportbackModalContainer from './containers/PostReportbackModalContainer';
export BlockModalContainer from './containers/BlockModalContainer';
export VoterRegistrationModalContainer from './containers/VoterRegistrationModalContainer';

// TODO: whoops, these probably need to be renamed to have 'Container' appended to the name.
export PostSignupModal from './containers/PostSignupModalContainer';
export ReportbackUploaderModal from './configurations/ReportbackUploaderModal';

export const POST_SIGNUP_MODAL = 'POST_SIGNUP_MODAL';
export const BLOCK_MODAL = 'BLOCK_MODAL';
export const REPORTBACK_UPLOADER_MODAL = 'REPORTBACK_UPLOADER_MODAL';
export const SURVEY_MODAL = 'SURVEY_MODAL';
export const POST_SHARE_MODAL = 'POST_SHARE_MODAL';
export const POST_REPORTBACK_MODAL = 'POST_REPORTBACK_MODAL';
export const VOTER_REGISTRATION_MODAL = 'VOTER_REGISTRATION_MODAL';
