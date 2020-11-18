import md5 from 'crypto-js/md5';

const gravatarBaseURL = 'https://www.gravatar.com/avatar/';

const gravatarAPI = (email) => {
  const HASH = md5(email);
  const gravatarImageSrc = `${gravatarBaseURL}${HASH}`;
  return gravatarImageSrc;
};

export default gravatarAPI;
