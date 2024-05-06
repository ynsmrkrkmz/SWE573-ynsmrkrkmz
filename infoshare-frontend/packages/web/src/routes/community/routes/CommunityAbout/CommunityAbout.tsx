import { Stack, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useCommunityContext } from 'routes/community/contexts/CommunityContext';
import { useAppContext } from 'contexts/AppContext';

const CommunityAbout: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setPageName } = useAppContext();
  const { description } = useCommunityContext();

  useEffect(() => {
    setPageName(intl.formatMessage({ id: 'community.about' }));
  }, [intl, setPageName]);

  return (
    <Stack direction={'column'} spacing={2}>
      <Typography variant={'h4'} color="primary" sx={{ flexGrow: 1 }}>
        {intl.formatMessage({
          id: 'community.about',
        })}
      </Typography>

      <div data-color-mode="light">
        <MDEditor.Markdown source={description} style={{ background: 'transparent' }} />
      </div>
    </Stack>
  );
};

export default CommunityAbout;
