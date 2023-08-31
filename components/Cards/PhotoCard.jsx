import placeHolder from 'public/assets/images/defaultImage.png';
import { Image } from 'react-bootstrap';

function PhotoCard({ photo }) {
  return (
    <div>
      <div className='img'>
        {photo.image_url ? (
          <Image
            alt=''
            src={`${process.env.NEXT_PUBLIC_API_URL}/${photo.image_url}`}
            fluid
            loading='lazy'
          />
        ) : (
          <Image
            alt=''
            src={placeHolder}
            fluid
            loading='lazy'
          />
        )}
      </div>
      <div className='text'>
        <h6 style={{ fontSize: '13px' }}>{photo.title.ar}</h6>
      </div>
    </div>
  );
}

export default PhotoCard;
