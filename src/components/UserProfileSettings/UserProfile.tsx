import Avatar from 'components/Avatar/Avatar';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useTranslation } from 'react-i18next';
import styles from './UserProfileSettings.module.css';

interface InterfaceUserProfile {
  firstName: string;
  lastName: string;
  createdAt: string;
  email: string;
  image: string;
}
const prettyDate = (param: string): string => {
  const date = new Date(param);
  if (date?.toDateString() === 'Invalid Date') {
    return 'Unavailable';
  }
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const UserProfile: React.FC<InterfaceUserProfile> = ({
  firstName,
  lastName,
  createdAt,
  email,
  image,
}): JSX.Element => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings',
  });
  const { t: tCommon } = useTranslation('common');
  return (
    <>
      <Card border="0" className="rounded-4 mb-4">
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>{t('profileDetails')}</div>
        </div>
        <Card.Body className={styles.cardBody}>
          <div className={`d-flex mb-2 ${styles.profileContainer}`}>
            <div className={styles.imgContianer}>
              {image && image !== 'null' ? (
                <img src={image} alt={`profile picture`} />
              ) : (
                <Avatar
                  name={`${firstName} ${lastName}`}
                  alt={`dummy picture`}
                />
              )}
            </div>
            <div className={styles.profileDetails}>
              <span style={{ fontWeight: '700', fontSize: '28px' }}>
                {`${firstName}`.charAt(0).toUpperCase() +
                  `${firstName}`.slice(1)}
              </span>
              <span data-testid="userEmail">{email}</span>
              <span className="d-flex">
                <CalendarMonthOutlinedIcon />
                <span className="d-flex align-end">
                  {tCommon('joined')} {prettyDate(createdAt)}
                </span>
              </span>
            </div>
          </div>
          <div className="mt-2 mb-1 d-flex justify-content-center">
            <Button data-testid="copyProfileLink">{t('copyLink')}</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserProfile;
