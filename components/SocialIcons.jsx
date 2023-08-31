import useSWR from 'swr';
import SvgYouTube from 'components/Icons/SvgYouTube';
import SvgFaceBook from 'components/Icons/SvgFaceBook';
import SvgInstagram from 'components/Icons/SvgInstagram';
import SvgTwitter from 'components/Icons/SvgTwitter';
import SvgSoundCloud from 'components/Icons/SvgSoundCloud';
import SvgLinkedIn from 'components/Icons/SvgLinkedIn';
import SvgWhatsApp from 'components/Icons/SvgWhatsApp';
import SvgTelegram from 'components/Icons/SvgTelegram';
import SvgEmail from 'components/Icons/SvgEmail';

function SocialIcons({ fill }) {
  const { data: socials } = useSWR('/pgarticles/socials/0/10');

  const changeIcon = title => {
    if (title === 'twitter') {
      return <SvgTwitter fill={fill} />;
    } else if (title === 'whatsapp') {
      return <SvgWhatsApp fill={fill} />;
    } else if (title === 'facebook') {
      return <SvgFaceBook fill={fill} />;
    } else if (title === 'instagram') {
      return <SvgInstagram fill={fill} />;
    } else if (title === 'youtube') {
      return <SvgYouTube fill={fill} />;
    } else if (title === 'linkedin') {
      return <SvgLinkedIn fill={fill} />;
    } else if (title === 'soundcloud') {
      return (
        <SvgSoundCloud
          width={30}
          height={15}
          fill={fill}
          scale={'0.6'}
        />
      );
    } else if (title === 'telegram') {
      return (
        <SvgTelegram
          width={22}
          height={15}
          fill={fill}
          scale={'0.7'}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <div className='social__btns d-flex justify-content-between align-content-center'>
      {socials?.data && socials?.data.length > 0 && (
        <>
          {socials?.data.map(social => (
            <a
              key={social.id}
              href={social.content}
              className='btn-icon'
              target='_blank'
              rel='noopener noreferrer'
              title={social.title}
            >
              {changeIcon(social.title)}
            </a>
          ))}

          <a
            href='mailto:info@saee.org.sa'
            className='btn-icon'
            target='_blank'
            rel='noopener noreferrer'
            title='email'
          >
            <SvgEmail
              fill={fill}
              scale={'0.5'}
            />
          </a>
        </>
      )}
    </div>
  );
}

export default SocialIcons;
