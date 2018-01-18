export default from './containers/ModalSwitchContainer';

export Modal from './containers/ModalContainer';
export SurveyModalContainer from './containers/SurveyModalContainer';
export PostShareModalContainer from './containers/PostShareModalContainer';

// TODO: whoops, these probably need to be renamed to have 'Container' appended to the name.
export PostSignupModal from './containers/PostSignupModalContainer';
export ContentModal from './containers/ContentModalContainer';
export ReportbackUploaderModal from './configurations/ReportbackUploaderModal';

export const POST_SIGNUP_MODAL = 'POST_SIGNUP_MODAL';
export const CONTENT_MODAL = 'CONTENT_MODAL';
export const REPORTBACK_UPLOADER_MODAL = 'REPORTBACK_UPLOADER_MODAL';
export const SURVEY_MODAL = 'SURVEY_MODAL';
export const POST_SHARE_MODAL = 'POST_SHARE_MODAL';
