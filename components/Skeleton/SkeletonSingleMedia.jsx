import Skeleton from 'components/Skeleton/SkeletonElement';
import Spark from 'components/Skeleton/Spark';

const SkeletonSingleMedia = () => {
  return (
    <div className='skeleton-single'>
      <div className='skeleton-single__img'>
        <Skeleton type='thumbnail' />
      </div>
      <div className='skeleton-single__content'>
        <Skeleton type='title' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
        <Skeleton type='text' />
      </div>

      <Spark />
    </div>
  );
};

export default SkeletonSingleMedia;
