import { isDevEnvironment } from '../../../../helpers';

export const faq = {
  contentBlockId: isDevEnvironment()
    ? '6H22Y1wmICy05pM9twIGGR'
    : '1nLV3YUhLzJdlcGrd2Mq9N',
};

export const shareLink = {
  actionId: isDevEnvironment ? 27 : 1025,
  contentBlockId: isDevEnvironment()
    ? '1xcG1CTinKwn3Iyxtcc0f4'
    : '3fj7mXlyrcJZ3mUKXqco1R',
};
